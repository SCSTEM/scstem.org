import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { runLighthouse } from "../ci/lighthouse-runner.ts";

interface Failure {
  auditId: string;
  auditProperty?: string;
  passed: false;
  url: string;
}

interface Scenario {
  failures?: Failure[];
  collectStatus?: number;
  confirmationStatus?: number;
  finalStatus?: number;
  uploadStatus?: number;
  omitAssertions?: boolean;
}

const home = "https://localhost:4321/";
const timing: Failure = { auditId: "total-blocking-time", passed: false, url: home };
const directory = mkdtempSync(join(tmpdir(), "scstem-lighthouse-"));

const scenario = (options: Scenario) => {
  const calls: string[][] = [];
  let assertions = 0;
  let collections = 0;
  const status = runLighthouse(
    (args) => {
      calls.push(args);
      if (args[0] === "collect") {
        collections += 1;
        return collections === 1 ? (options.collectStatus ?? 0) : (options.confirmationStatus ?? 0);
      }
      if (args[0] === "assert") {
        assertions += 1;
        const failures = assertions === 1 ? (options.failures ?? []) : [];
        if (!options.omitAssertions) {
          writeFileSync(join(directory, "assertion-results.json"), JSON.stringify(failures));
        }
        return assertions === 1 ? Number(failures.length > 0) : (options.finalStatus ?? 0);
      }
      assert.equal(args[0], "upload");
      return options.uploadStatus ?? 0;
    },
    "tools/ci/lighthouserc.json",
    directory,
  );
  return { calls, status };
};

try {
  const passed = scenario({});
  assert.equal(passed.status, 0);
  assert.deepEqual(
    passed.calls.map((call) => call[0]),
    ["collect", "assert", "upload"],
  );

  const confirmed = scenario({
    failures: [timing, { ...timing, auditId: "largest-contentful-paint" }],
  });
  assert.equal(confirmed.status, 0);
  assert.deepEqual(confirmed.calls[2], [
    "collect",
    "--config=tools/ci/lighthouserc.json",
    "--additive",
    "--numberOfRuns=2",
    `--url=${home}`,
  ]);
  assert.deepEqual(
    confirmed.calls.map((call) => call[0]),
    ["collect", "assert", "collect", "assert", "upload"],
  );
  assert.equal(
    readFileSync(join(directory, "reports/initial-assertion-results.json"), "utf8"),
    JSON.stringify([timing, { ...timing, auditId: "largest-contentful-paint" }]),
  );

  const multiple = scenario({ failures: [timing, { ...timing, url: `${home}programs/frc` }] });
  assert.deepEqual(
    multiple.calls[2]?.filter((arg) => arg.startsWith("--url=")),
    [`--url=${home}`, `--url=${home}programs/frc`],
  );

  for (const failure of [
    { ...timing, auditId: "categories", auditProperty: "accessibility" },
    { ...timing, auditId: "categories", auditProperty: "seo" },
    { ...timing, auditId: "categories", auditProperty: "best-practices" },
    { ...timing, auditId: "resource-summary", auditProperty: "script:size" },
    { ...timing, auditId: "cumulative-layout-shift" },
  ]) {
    const hardFailure = scenario({ failures: [timing, failure] });
    assert.equal(hardFailure.status, 1);
    assert.equal(hardFailure.calls.filter((call) => call[0] === "collect").length, 1);
  }
  assert.equal(
    scenario({ failures: [{ ...timing, auditId: "categories", auditProperty: "performance" }] })
      .calls.length,
    5,
  );
  assert.equal(scenario({ failures: [timing], finalStatus: 1 }).status, 1);
  assert.equal(scenario({ failures: [timing], confirmationStatus: 2 }).status, 2);
  assert.equal(scenario({ uploadStatus: 3 }).status, 3);
  assert.equal(scenario({ omitAssertions: true }).status, 1);
  const collectionFailure = scenario({ collectStatus: 2 });
  assert.equal(collectionFailure.status, 2);
  assert.deepEqual(
    collectionFailure.calls.map((call) => call[0]),
    ["collect", "upload"],
  );
  assert.ok(
    !existsSync(join(directory, "reports/initial-assertion-results.json")),
    "stale assertions are removed",
  );

  console.log("Lighthouse fast path, bounded confirmation, hard failures, and artifacts verified");
} finally {
  rmSync(directory, { recursive: true, force: true });
}
