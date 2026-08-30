/**
 * `cn`'s `font-size` class group is a hand-maintained mirror of DESIGN.md §3's type scale. A
 * token missing from it silently loses to any color beside it — the failure only shows up as a
 * wrong size in a browser. This makes the divergence a `pnpm check` failure instead. Run from
 * the repo root.
 */
import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/global.css", "utf8");
const cnSource = readFileSync("src/lib/cn.ts", "utf8");

const themeStart = css.indexOf("@theme");
if (themeStart === -1) {
  console.error("tools/checks/cn-font-size-group: no @theme block in src/styles/global.css");
  process.exit(1);
}

/** `--text-<name>` declarations, skipping the `--text-x--line-height` style of sub-property. */
const sizeTokens = new Set(
  [...css.matchAll(/--text-([\w-]+):/g)]
    .map((match) => match[1])
    .filter((name) => !name.includes("--")),
);

/**
 * The color namespace wins where a name is both a color and a size, so those sizes are reached
 * through a `@utility` instead and belong in the group under that name.
 */
const utilityAliases = new Map();
for (const match of css.matchAll(
  /@utility (text-[\w-]+) \{[^}]*font-size: var\(--text-([\w-]+)\)/g,
)) {
  const [, utility, token] = match;
  if (utility !== undefined && token !== undefined) {
    utilityAliases.set(token, utility);
  }
}

const groupMatch = /"font-size": \[([^\]]*)\]/s.exec(cnSource);
if (groupMatch?.[1] === undefined) {
  console.error('tools/checks/cn-font-size-group: no "font-size" class group in src/lib/cn.ts');
  process.exit(1);
}
const listed = new Set([...groupMatch[1].matchAll(/"([^"]+)"/g)].flatMap((m) => m[1] ?? []));

const expected = new Set();
for (const token of sizeTokens) {
  expected.add(utilityAliases.get(token) ?? `text-${token}`);
}

const missing = [...expected].filter((name) => !listed.has(name));
const extra = [...listed].filter((name) => !expected.has(name));

if (missing.length > 0 || extra.length > 0) {
  console.error(
    "tools/checks/cn-font-size-group: src/lib/cn.ts's font-size group has drifted from the " +
      "--text-* tokens in src/styles/global.css.",
  );
  if (missing.length > 0) {
    console.error(`  missing from cn.ts: ${missing.join(", ")}`);
  }
  if (extra.length > 0) {
    console.error(`  in cn.ts but not a token: ${extra.join(", ")}`);
  }
  process.exit(1);
}

console.log(`cn font-size group matches ${String(expected.size)} type tokens`);
