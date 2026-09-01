/**
 * Trims Inter's weight axis to the range the site uses, and commits the result.
 *
 * `@fontsource-variable/inter` ships `wght 100 900`. DESIGN.md §3 sanctions 400/500/600 for Inter
 * and nothing else uses it — the two `font-bold` call sites are Orbitron — so more than half the
 * axis is delta data for weights that never render. Instancing to `400 700` (one step of headroom,
 * for 0.6 KB, so a stray `font-bold` on body copy renders rather than synthesizes) takes the face
 * on the critical path from 47.1 KB to 35.3 KB. `docs/adr/0011-inter-weight-axis.md` covers why,
 * including why Orbitron and Source Code Pro are left alone.
 *
 * Needs Python with `fonttools` and `brotli` (`pip install fonttools brotli`). Run by hand, from
 * the repo root, and commit `src/styles/fonts/`; nothing in `pnpm build` depends on it:
 *
 *     node tools/assets/font-subset.ts
 */
import { execFileSync } from "node:child_process";

/** `[source in node_modules, committed name]`. Both Inter subsets, so the pair cannot drift. */
const FACES: [source: string, name: string][] = [
  ["inter-latin-wght-normal.woff2", "inter-latin-wght-400-700.woff2"],
  ["inter-latin-ext-wght-normal.woff2", "inter-latin-ext-wght-400-700.woff2"],
];
const RANGE: [low: number, high: number] = [400, 700];
const OUT = "src/styles/fonts";

execFileSync(
  "python3",
  [
    "-c",
    `
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

faces = ${JSON.stringify(FACES)}
low, high = ${JSON.stringify(RANGE)}
out = ${JSON.stringify(OUT)}
os.makedirs(out, exist_ok=True)

for source, name in faces:
    path = os.path.join("node_modules/@fontsource-variable/inter/files", source)
    before = os.path.getsize(path)
    font = instantiateVariableFont(TTFont(path), {"wght": (low, high)}, inplace=False,
                                   updateFontNames=False)
    font.flavor = "woff2"
    target = os.path.join(out, name)
    font.save(target)
    after = os.path.getsize(target)
    print(f"{target}  {before/1024:.1f} kB -> {after/1024:.1f} kB")
`,
  ],
  { stdio: "inherit" },
);
