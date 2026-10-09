/**
 * Quality for photographic `<Image>` variants. Every raster in `src/assets/` is already a 2560px
 * q80 master (`docs/content.md`, "Add a photograph"), so the default quality recompresses a lossy
 * file and can emit a variant larger than its source; 70 stays under the source with no visible
 * loss. Variants stay WebP: AVIF only beats it at an encoder effort that costs seconds per variant.
 *
 * A responsive call site also passes `width` equal to the largest of its `widths`; without it
 * Astro fills the fallback `src` from the 2560px master.
 *
 * Not for logos and line art: they are small already, and quantizing flat colour makes a mark
 * look cheap.
 */
export const PHOTO_QUALITY = 70;
