import { createCn } from "cn/config";

/**
 * A `cn` configured for this site's type scale; components import it from here, never from the
 * `cn` package directly.
 *
 * The merge step knows Tailwind's stock `text-*` sizes but not our semantic ones, so without this
 * group it treats every `text-*` class as one conflict and keeps only the last —
 * `cn("text-primary-foreground", "text-copy")` would collapse to `text-copy`. Registering the
 * type scale as the font-size group keeps a size and a color side by side.
 *
 * The list is the nine text roles from DESIGN.md §3. It mirrors the `--text-*` names
 * `src/styles/global.css` maps from `tokens.css` by hand: a new size token there is a new entry
 * here, and a token missing here loses to any color beside it with no error, only a wrong size
 * in the browser.
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
        "text-lead",
        "text-copy",
        "text-small",
        "text-label",
      ],
    },
  },
});
