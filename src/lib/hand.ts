/** Adjacent instances must not share a variant. */
export type HandVariant = 1 | 2 | 3;

/** `chalk` is white, for marks over photography; `marker` is the accent's marker color. */
export type HandTone = "chalk" | "marker";

interface HandMarkProps {
  variant?: HandVariant | undefined;
  tone?: HandTone | undefined;
  class?: string | undefined;
}

export interface ChalkOvalProps extends HandMarkProps {
  around?: "word" | "control" | undefined;
}

export type ChalkUnderlineProps = HandMarkProps;

export const handToneClass = (tone: HandTone): string =>
  tone === "chalk" ? "text-foreground" : "text-mark";

/** The accent's text color, not the marker's: the light finish's yellow marker fails as text. */
export const handwritingClass = "font-hand text-primary-bright";

export const handMarkClass = "draw-on hand-stroke pointer-events-none";

export const handWipeClass = "draw-wipe hand-stroke pointer-events-none";

/** On a mark drawn inside a `group/link` anchor: the stroke shades with the link text on hover. */
export const handLinkShadeClass =
  "transition-colors duration-(--sc2-duration-micro) ease-(--sc2-ease-toggle) group-hover/link:text-inherit";
