/**
 * Writes the link underline strokes into `src/styles/tokens.css` (DESIGN.md §2.14): three drift
 * variants, for each accent, for each finish — eighteen data URIs. A data URI cannot read a CSS
 * variable, so each stroke's color is baked in; this script keeps the eighteen in step with the
 * three paths below and with the colors the stylesheet already declares.
 *
 * Each accent's strokes take its dark-finish text color (`--sc2-primary-bright`) and its
 * light-finish marker (`--sc2-mark`). By hand, from the repo root, after changing either or a
 * path here; commit the result:
 *
 *     pnpm assets:underlines
 */
import { readFile, writeFile } from "node:fs/promises";

const TOKENS = new URL("../../src/styles/tokens.css", import.meta.url);

/**
 * The drift (§2.14): nearly straight, rising ~2px toward the end. The SVG is stretched to the
 * link's width and 0.8em tall, and `non-scaling-stroke` keeps the 4.2px weight at any size.
 */
const PATHS = [
  "M1.5 13.2C28 13.3 64 12.4 98.5 10.4",
  "M1.5 12.4C34 13.4 66 12.8 98.5 11.2",
  "M1.5 13.4C22 12.7 62 12.3 98.8 11.8",
] as const;

const WEIGHT = 4.2;

const uri = (hex: string, path: string): string =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 16' preserveAspectRatio='none'%3E%3Cpath d='${path}' fill='none' stroke='%23${hex.replace("#", "")}' stroke-width='${String(WEIGHT)}' stroke-linecap='round' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`;

/** The `[light, dark]` sides of a `light-dark()` declaration inside a block. */
const sides = (block: string, name: string): readonly [string, string] => {
  const match = new RegExp(
    `--sc2-${name}:\\s*light-dark\\((#[\\da-f]{6}),\\s*(#[\\da-f]{6})\\)`,
    "i",
  ).exec(block);
  const light = match?.[1];
  const dark = match?.[2];
  if (light === undefined || dark === undefined) {
    throw new Error(`--sc2-${name} is not a light-dark() pair of hex colors in this block`);
  }
  return [light, dark];
};

const UNDERLINE = /^ *--sc2-underline-\d-(?:dark|light):[^;]*;\n/gm;

const css = await readFile(TOKENS, "utf8");

/** `:root` and every `[data-accent]` block: the blocks that set an accent's colors. */
const headers = [":root {", ...[...css.matchAll(/^\[data-accent="[\w-]+"] \{/gm)].map((m) => m[0])];

let out = css;
for (const header of headers) {
  const start = out.indexOf(header);
  // Through the newline before `}`, so the block's last declaration keeps its line ending.
  const end = out.indexOf("\n}", start) + 1;
  const block = out.slice(start, end);

  const [, text] = sides(block, "primary-bright");
  const [marker] = sides(block, "mark");
  const lines = PATHS.flatMap((path, index) => [
    `  --sc2-underline-${String(index + 1)}-dark: ${uri(text, path)};\n`,
    `  --sc2-underline-${String(index + 1)}-light: ${uri(marker, path)};\n`,
  ]).join("");

  const at = block.search(UNDERLINE);
  if (at === -1) {
    throw new Error(`${header} has no --sc2-underline-* declarations to replace`);
  }
  const rewritten = block.slice(0, at) + lines + block.slice(at).replaceAll(UNDERLINE, "");
  out = out.slice(0, start) + rewritten + out.slice(end);
}

await writeFile(TOKENS, out);
console.log(`Wrote ${String(headers.length * PATHS.length * 2)} underline strokes to tokens.css`);
