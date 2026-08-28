// `?raw` inlines the stylesheet's source at build time. `readFileSync` cannot be used here:
// the page is bundled before it is prerendered, so a path relative to this module no longer
// points at `src/`.
import css from "@/styles/global.css?raw";

/**
 * Reads the design tokens out of `src/styles/global.css` at build time, so anything verifying
 * them verifies the values the site actually ships.
 *
 * `/styleguide` used to restate every hex as a TS literal, which meant its contrast gate
 * compared one copy of the palette against another: editing a token in the stylesheet alone
 * left the build green against the stale value. The stylesheet stays authoritative
 * (DESIGN.md §11) and this module is the only reader.
 */

/** Body of the first `{ … }` following `header`, or undefined when the header is absent. */
const blockAfter = (header: string): string | undefined => {
  const start = css.indexOf(header);
  if (start === -1) {
    return undefined;
  }

  const open = css.indexOf("{", start);
  if (open === -1) {
    return undefined;
  }

  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    const char = css[index];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(open + 1, index);
      }
    }
  }
  return undefined;
};

const declarations = (body: string): ReadonlyMap<string, string> => {
  const found = new Map<string, string>();
  for (const match of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    const [, name, value] = match;
    if (name !== undefined && value !== undefined) {
      found.set(name, value.trim());
    }
  }
  return found;
};

const theme = declarations(blockAfter("@theme") ?? "");

const themeOverrides = (program: string): ReadonlyMap<string, string> =>
  declarations(blockAfter(`[data-theme="${program}"]`) ?? "");

const required = (name: string, from: ReadonlyMap<string, string>, where: string): string => {
  const value = from.get(name);
  if (value === undefined) {
    throw new Error(`token ${name} not found in ${where} (src/styles/global.css)`);
  }
  return value;
};

/** A `--color-*` token from the base `@theme` block, as a six-digit hex. */
export const color = (name: string): string => required(`--color-${name}`, theme, "@theme");

/** A `--radius-*` token from the base `@theme` block. */
export const radius = (name: string): string => required(`--radius-${name}`, theme, "@theme");

/**
 * A `--color-*` token as a program theme remaps it (DESIGN.md §2, D16). Falls back to the base
 * value, so a theme that does not touch a token still resolves.
 */
export const programColor = (program: string, name: string): string => {
  const overrides = themeOverrides(program);
  return overrides.get(`--color-${name}`) ?? color(name);
};

/** Program themes declared in the stylesheet, in source order. */
export const programThemes = (): ReadonlyArray<string> => [
  ...new Set([...css.matchAll(/\[data-theme="([\w-]+)"]/g)].flatMap((match) => match[1] ?? [])),
];

/**
 * The highlighter swipe's alpha (DESIGN.md §2.13), read from `@utility highlight-swipe` so the
 * ratio the styleguide prints is measured against the percentage the stylesheet applies.
 */
export const swipeAlpha = (): number => {
  const body = blockAfter("@utility highlight-swipe");
  const match = /color-mix\(in srgb, var\(--color-primary\) (\d+)%/.exec(body ?? "");
  const percent = match?.[1];
  if (percent === undefined) {
    throw new Error("could not read the swipe alpha from @utility highlight-swipe");
  }
  return Number(percent) / 100;
};
