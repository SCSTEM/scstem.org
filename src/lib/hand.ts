/**
 * The shared contract of the hand-markup register (DESIGN.md §2.12–2.15), so the devices that
 * draw by hand (ChalkOval, ChalkUnderline, SketchArrow) do not restate it.
 */

/** Every device ships three path variants; two adjacent instances must not share one. */
export type HandVariant = 1 | 2 | 3;

/** `chalk` is white, for marks over photography; `pencil` is the grease-pencil accent. */
export type HandTone = "chalk" | "pencil";

export const handToneClass = (tone: HandTone): string =>
  tone === "chalk" ? "text-foreground" : "text-primary";

/** Every hand-drawn SVG: draw-on entrance, the shared stroke recipe, and no hit target. */
export const handMarkClass = "draw-on hand-stroke pointer-events-none";
