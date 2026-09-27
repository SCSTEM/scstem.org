/**
 * The shared contract of the hand-markup register (DESIGN.md §2.12–2.20), so the devices that
 * draw by hand (ChalkOval, ChalkUnderline, SketchArrow, StrikeCorrect) do not restate it.
 */

/** Every device ships three path variants; two adjacent instances must not share one. */
export type HandVariant = 1 | 2 | 3;

/** `chalk` is white, for marks over photography; `marker` is the accent's marker color. */
export type HandTone = "chalk" | "marker";

export const handToneClass = (tone: HandTone): string =>
  tone === "chalk" ? "text-foreground" : "text-mark";

/**
 * Handwriting takes the accent's text color rather than the marker's: the light finish's yellow
 * marker is a stroke color and fails as text (DESIGN.md §2.15).
 */
export const handwritingClass = "font-hand text-primary-bright";

/** Every hand-drawn SVG: draw-on entrance, the shared stroke recipe, and no hit target. */
export const handMarkClass = "draw-on hand-stroke pointer-events-none";
