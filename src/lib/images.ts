/**
 * The re-encode point for photographic `<Image>` variants.
 *
 * Every raster source in `src/assets/` is already a 2560px q80 master
 * (`tools/assets/optimize-sources.mjs`), so a variant generated at astro:assets' default quality
 * is a *recompression* of an already-lossy file — at the widest step it came out larger than the
 * master it was derived from. 70 puts the 1920px variant comfortably under its source with no
 * visible loss on photography (`docs/adr/0005-webp-only-variants.md`).
 *
 * Logos and line art are excluded on purpose: they are small already, and quantizing flat colour
 * is what makes a mark look cheap.
 */
export const PHOTO_QUALITY = 70;
