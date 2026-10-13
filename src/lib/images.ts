/**
 * Quality for photographic `<Image>` variants. Source rasters are already 2560px q80 masters, so
 * the default quality recompresses a lossy file and can emit a variant larger than its source; 70
 * stays under it with no visible loss.
 *
 * A responsive call site must also pass `width` equal to the largest of its `widths`; without it
 * Astro fills the fallback `src` from the 2560px master.
 *
 * Not for logos and line art: quantizing flat colour makes a mark look cheap.
 */
export const PHOTO_QUALITY = 70;
