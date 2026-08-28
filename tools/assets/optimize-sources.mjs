/* oxlint-disable eslint/no-await-in-loop -- deliberately sequential: sharp holds a decoded
   bitmap per in-flight image, and these sources run to 6000x4000, so encoding them in parallel
   spikes memory for no wall-clock gain on a script that is run by hand. */
/**
 * Re-encodes oversized source images in `src/assets/` (plan/09 §2).
 *
 * These are camera masters — up to 6000px wide and losslessly encoded. `<Image>` with no explicit
 * `widths` derives its largest variant from the source's own dimensions, so an un-downscaled
 * master makes the build spend seconds per image producing a derivative that can come out *larger
 * than the input*. Downscaling the source caps that and costs nothing visually: no layout on the
 * site is wider than ~1600 CSS px, so 2560px still covers 2x on the widest hero.
 *
 * Run manually, from the repo root, and commit the result:
 *
 *     node tools/assets/optimize-sources.mjs           # report only
 *     node tools/assets/optimize-sources.mjs --write    # re-encode in place
 *
 * Git history keeps the originals.
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

import sharp from "sharp";

/** plan/09 §2: max dimension 2560px, quality-tuned WebP/JPEG. */
const MAX_DIMENSION = 2560;
const QUALITY = 80;
/** Below this, re-encoding is not worth the churn in git. */
const SIZE_THRESHOLD = 300 * 1024;
/**
 * Re-encoding an already-optimized WebP always shaves a little off, so without a floor this
 * script would never reach a fixpoint and repeat runs would slowly degrade every image.
 */
const MIN_GAIN = 0.05;

const ROOT = "src/assets";
const RASTER = new Set([".webp", ".jpg", ".jpeg", ".png"]);

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(path);
      }
      return RASTER.has(extname(entry.name).toLowerCase()) ? [path] : [];
    }),
  );
  return nested.flat();
};

const write = process.argv.includes("--write");
let touched = 0;
let savedBytes = 0;

for (const path of (await walk(ROOT)).toSorted()) {
  const before = (await stat(path)).size;
  const image = sharp(path);
  const { width, height, format } = await image.metadata();
  if (width === undefined || height === undefined) {
    continue;
  }

  const tooLarge = Math.max(width, height) > MAX_DIMENSION;
  if (!tooLarge && before < SIZE_THRESHOLD) {
    continue;
  }

  const resized = tooLarge
    ? sharp(path)
        .rotate()
        .resize({
          width: width >= height ? MAX_DIMENSION : undefined,
          height: height > width ? MAX_DIMENSION : undefined,
          withoutEnlargement: true,
        })
    : sharp(path).rotate();

  const encoded =
    format === "png"
      ? await resized.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer()
      : await resized.webp({ quality: QUALITY }).toBuffer();

  if (encoded.length > before * (1 - MIN_GAIN)) {
    console.log(`skip  ${path} — no meaningful gain (${fmt(before)} -> ${fmt(encoded.length)})`);
    continue;
  }

  const meta = await sharp(encoded).metadata();
  console.log(
    `${write ? "write" : "would"} ${path}  ${String(width)}x${String(height)} ${fmt(before)}` +
      ` -> ${String(meta.width ?? 0)}x${String(meta.height ?? 0)} ${fmt(encoded.length)}`,
  );
  if (write) {
    await writeFile(path, encoded);
  }
  touched += 1;
  savedBytes += before - encoded.length;
}

function fmt(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

console.log(
  `\n${String(touched)} file(s) ${write ? "re-encoded" : "would change"}, ${fmt(savedBytes)} saved`,
);
if (!write && touched > 0) {
  console.log("re-run with --write to apply");
}
