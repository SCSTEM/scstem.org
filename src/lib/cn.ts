import { createCn } from "cnfast";

/**
 * A `cn` configured for this site's type scale; components import it from here, never from
 * `cnfast` directly.
 *
 * The merge step knows Tailwind's stock `text-*` sizes but not our semantic ones, so without this
 * group it treats every `text-*` class as one conflict and keeps only the last —
 * `cn("text-primary-foreground", "text-body")` would collapse to `text-body`. Registering the
 * type scale as the font-size group keeps a size and a color side by side.
 *
 * The list is the type scale from DESIGN.md §3 plus `text-copy` (the size utility, since the
 * color owns `text-body`). It mirrors the `--text-*` tokens in `src/styles/global.css` by hand:
 * a new size token there is a new entry here, and a token missing here loses to any color beside
 * it with no error, only a wrong size in the browser.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-stat",
        "text-body-lg",
        "text-small",
        "text-label",
        "text-copy",
      ],
    },
  },
});
