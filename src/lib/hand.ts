/** Adjacent instances must not share a variant. */
export type HandVariant = 1 | 2 | 3;

/** `chalk` is white, for marks over photography; `marker` is the accent's marker color. */
export type HandTone = "chalk" | "marker";

export const handToneClass = (tone: HandTone): string =>
  tone === "chalk" ? "text-foreground" : "text-mark";

/** The accent's text color, not the marker's: the light finish's yellow marker fails as text. */
export const handwritingClass = "font-hand text-primary-bright";

export const handMarkClass = "draw-on hand-stroke pointer-events-none";
