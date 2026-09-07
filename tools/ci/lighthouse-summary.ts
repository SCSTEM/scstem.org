/**
 * Renders the Lighthouse CI run in `.lighthouseci/` as Markdown: median category scores per URL,
 * every failed assertion, then for each URL what the LCP was and the requests in flight before
 * it. The last part is what answers "why did LCP move" without downloading the report artifact:
 * on the simulated Slow 4G link every request costs a fixed latency and every kilobyte costs
 * time, so the waterfall is the budget.
 *
 *     node tools/ci/lighthouse-summary.ts | tee -a "$GITHUB_STEP_SUMMARY"
 */
import { existsSync, readFileSync } from "node:fs";

interface RunSummary {
  isRepresentativeRun: boolean;
  jsonPath: string;
  summary: Record<string, number>;
  url: string;
}

interface Assertion {
  actual: number;
  auditId: string;
  auditProperty?: string;
  expected: number;
  operator: string;
  passed: boolean;
  url: string;
}

interface NetworkRequest {
  networkEndTime: number;
  networkRequestTime: number;
  priority?: string;
  resourceType?: string;
  transferSize: number;
  url: string;
}

interface LcpPhase {
  phase: string;
  timing: number;
}

/** The slice of a Lighthouse report this script reads. */
interface Report {
  audits: {
    "largest-contentful-paint": { numericValue: number };
    "largest-contentful-paint-element": {
      details?: {
        items: [{ items: [{ node: { nodeLabel: string } }] }, { items: LcpPhase[] }];
      };
    };
    "network-requests": { details: { items: NetworkRequest[] } };
  };
  environment: { benchmarkIndex: number; hostUserAgent: string };
  lighthouseVersion: string;
}

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

const read = <T>(path: string): T[] =>
  // SAFETY: both files are written by @lhci/cli in the shape declared above.
  existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as T[]) : [];

const report = (path: string): Report =>
  // SAFETY: a Lighthouse report; only the audits declared in `Report` are read.
  JSON.parse(readFileSync(path, "utf8")) as Report;

const runs = read<RunSummary>(".lighthouseci/reports/manifest.json");
const assertions = read<Assertion>(".lighthouseci/assertion-results.json");

const path = (url: string): string => new URL(url).pathname;
const score = (value: number): string => {
  const percent = Math.round(value * 100);
  return `${percent >= 90 ? "🟢" : percent >= 50 ? "🟠" : "🔴"} ${String(percent)}`;
};
const ms = (value: number): string => `${String(Math.round(value))} ms`;
const kb = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KB`;

const lines = ["## Lighthouse", ""];
const representative = runs.filter((r) => r.isRepresentativeRun);

if (representative.length === 0) {
  lines.push("No reports were written.");
} else {
  lines.push(`| URL | ${CATEGORIES.join(" | ")} |`, `|---|${"---|".repeat(CATEGORIES.length)}`);
  for (const run of representative) {
    const cells = CATEGORIES.map((c) => score(run.summary[c] ?? 0));
    lines.push(`| \`${path(run.url)}\` | ${cells.join(" | ")} |`);
  }
}

const failed = assertions.filter((a) => !a.passed);
if (failed.length > 0) {
  lines.push("", `### ${String(failed.length)} failed assertion(s)`, "");
  lines.push("| URL | Audit | Expected | Actual |", "|---|---|---|---|");
  for (const a of failed) {
    const audit = a.auditProperty === undefined ? a.auditId : `${a.auditId}.${a.auditProperty}`;
    lines.push(
      `| \`${path(a.url)}\` | \`${audit}\` | ${a.operator} ${String(a.expected)} | ${String(a.actual)} |`,
    );
  }
}

if (representative.length > 0) {
  const [first] = representative;
  if (first !== undefined) {
    const { environment, lighthouseVersion } = report(first.jsonPath);
    const chrome = /Chrome\/[\d.]+/u.exec(environment.hostUserAgent)?.[0] ?? "Chrome";
    lines.push(
      "",
      `### Largest Contentful Paint, median run per URL`,
      "",
      `Lighthouse ${lighthouseVersion}, ${chrome}, benchmark index ${String(Math.round(environment.benchmarkIndex))}.`,
    );
  }

  for (const run of representative) {
    const { audits } = report(run.jsonPath);
    const lcp = audits["largest-contentful-paint"].numericValue;
    const element = audits["largest-contentful-paint-element"].details;
    const label = element?.items[0].items[0]?.node.nodeLabel ?? "(no element)";
    const phases =
      element?.items[1].items.map((p) => `${p.phase} ${ms(p.timing)}`).join(", ") ?? "";
    lines.push("", `**\`${path(run.url)}\`** — LCP ${ms(lcp)}, ${label}`, "", phases, "");

    const requests = audits["network-requests"].details.items.filter(
      (r) => !r.url.startsWith("data:"),
    );
    const total = requests.reduce((sum, r) => sum + r.transferSize, 0);
    lines.push(
      "<details>",
      `<summary>${String(requests.length)} requests, ${kb(total)} transferred</summary>`,
      "",
      "| Start | End | Size | Priority | Type | Path |",
      "|---:|---:|---:|---|---|---|",
    );
    for (const r of requests) {
      lines.push(
        `| ${ms(r.networkRequestTime)} | ${ms(r.networkEndTime)} | ${kb(r.transferSize)} | ` +
          `${r.priority ?? ""} | ${r.resourceType ?? ""} | \`${path(r.url)}\` |`,
      );
    }
    lines.push("", "</details>");
  }
}

console.log(lines.join("\n"));
