import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Assertion {
  auditId: string;
  auditProperty?: string;
  level?: string;
  passed: boolean;
  url: string;
}

type LighthouseCommand = (args: string[]) => number;

const timingFailure = (assertion: Assertion): boolean =>
  assertion.auditId === "largest-contentful-paint" ||
  assertion.auditId === "total-blocking-time" ||
  (assertion.auditId === "categories" && assertion.auditProperty === "performance");

export const runLighthouse = (
  execute: LighthouseCommand,
  config = "tools/ci/lighthouserc.json",
  directory = ".lighthouseci",
): number => {
  const assertionsPath = join(directory, "assertion-results.json");
  const initialPath = join(directory, "initial-assertion-results.json");
  const reports = join(directory, "reports");
  mkdirSync(directory, { recursive: true });
  for (const path of [assertionsPath, initialPath, join(directory, "passed"), reports]) {
    rmSync(path, { force: true, recursive: true });
  }

  const run = (command: string, ...args: string[]): number =>
    execute([command, `--config=${config}`, ...args]);
  let retryUrls: string[] = [];

  const audit = (): number => {
    const collected = run("collect");
    if (collected !== 0) return collected;
    const initial = run("assert");
    if (!existsSync(assertionsPath)) return initial || 1;
    copyFileSync(assertionsPath, initialPath);
    if (initial === 0) return 0;

    // SAFETY: Lighthouse CI writes this assertion schema; malformed output fails the job.
    const assertions = JSON.parse(readFileSync(assertionsPath, "utf8")) as Assertion[];
    const failures = assertions.filter(
      (assertion) => !assertion.passed && assertion.level !== "warn",
    );
    if (failures.length === 0 || !failures.every(timingFailure)) return initial;
    retryUrls = [...new Set(failures.map((assertion) => assertion.url))];
    console.log(`Confirming timing failures with two additional runs: ${retryUrls.join(", ")}`);
    const confirmed = run(
      "collect",
      "--additive",
      "--numberOfRuns=2",
      ...retryUrls.map((url) => `--url=${url}`),
    );
    return confirmed === 0 ? run("assert") : confirmed;
  };

  const result = audit();
  const uploaded = run("upload");
  mkdirSync(reports, { recursive: true });
  for (const name of ["initial-assertion-results.json", "assertion-results.json"]) {
    const path = join(directory, name);
    if (existsSync(path)) copyFileSync(path, join(reports, name));
  }
  writeFileSync(join(reports, "retry-urls.json"), JSON.stringify(retryUrls));
  return result || uploaded;
};
