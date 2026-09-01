/**
 * Renders the Lighthouse CI run in `.lighthouseci/` as a Markdown job summary: median category
 * scores per URL, then every failed assertion.
 *
 *     node tools/ci/lighthouse-summary.ts >>"$GITHUB_STEP_SUMMARY"
 */
import { existsSync, readFileSync } from "node:fs";

interface RunSummary {
  isRepresentativeRun: boolean;
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

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

const read = <T>(path: string): T[] =>
  // SAFETY: both files are written by @lhci/cli in the shape declared above.
  existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as T[]) : [];

const runs = read<RunSummary>(".lighthouseci/reports/manifest.json");
const assertions = read<Assertion>(".lighthouseci/assertion-results.json");

const path = (url: string): string => new URL(url).pathname;
const score = (value: number): string => {
  const percent = Math.round(value * 100);
  return `${percent >= 90 ? "🟢" : percent >= 50 ? "🟠" : "🔴"} ${String(percent)}`;
};

const lines = ["## Lighthouse", ""];

if (runs.length === 0) {
  lines.push("No reports were written.");
} else {
  lines.push(`| URL | ${CATEGORIES.join(" | ")} |`, `|---|${"---|".repeat(CATEGORIES.length)}`);
  for (const run of runs.filter((r) => r.isRepresentativeRun)) {
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

console.log(lines.join("\n"));
