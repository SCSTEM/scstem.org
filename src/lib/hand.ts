/**
 * The hand-markup register's two tones (DESIGN.md §2, §13). `chalk` is white, for marks over
 * photography; `pencil` is the grease-pencil accent, for marks on the page ground.
 *
 * Shared so the mapping is not restated in every device that draws by hand.
 */
export type HandTone = "chalk" | "pencil";

export const handToneClass = (tone: HandTone): string =>
  tone === "chalk" ? "text-foreground" : "text-primary";
