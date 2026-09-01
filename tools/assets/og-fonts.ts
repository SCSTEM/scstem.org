/**
 * Instances the Orbitron variable woff2 the site ships into a static TTF in `~/.fonts`, so
 * `tools/assets/og-cards.ts` can name it in an SVG: librsvg resolves `font-family` through
 * fontconfig, which reads neither woff2 nor a variable axis.
 *
 * Needs Python with `fonttools` and `brotli` (`pip install fonttools brotli`). Run once per
 * machine, before the card generator; nothing in `pnpm build` depends on it:
 *
 *     node tools/assets/og-fonts.ts
 */
import { execFileSync } from "node:child_process";

const SOURCE = "node_modules/@fontsource-variable/orbitron/files/orbitron-latin-wght-normal.woff2";

execFileSync(
  "python3",
  [
    "-c",
    `
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

source = ${JSON.stringify(SOURCE)}
target = os.path.expanduser("~/.fonts")
os.makedirs(target, exist_ok=True)

font = instantiateVariableFont(TTFont(source), {"wght": 700}, inplace=False)
for name_id in (1, 4):
    font["name"].setName("OGOrbitron Bold", name_id, 3, 1, 0x409)
font["name"].setName("Regular", 2, 3, 1, 0x409)
font.flavor = None
font.save(os.path.join(target, "Orbitron-Bold.ttf"))
print("wrote", os.path.join(target, "Orbitron-Bold.ttf"))
`,
  ],
  { stdio: "inherit" },
);

execFileSync("fc-cache", ["-f"], { stdio: "inherit" });
console.log("fontconfig refreshed");
