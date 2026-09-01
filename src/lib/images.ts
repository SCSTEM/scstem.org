/**
 * Quality for photographic `<Image>` variants. Every raster in `src/assets/` is already a 2560px
 * q80 master (`tools/assets/optimize-sources.ts`), so the default quality recompresses a lossy
 * file and can emit a variant larger than its source; 70 stays under the source with no visible
 * loss (`docs/adr/0005-webp-only-image-variants.md`).
 *
 * Not for logos and line art: they are small already, and quantizing flat colour makes a mark
 * look cheap.
 */
export const PHOTO_QUALITY = 70;
