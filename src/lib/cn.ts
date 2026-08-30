import { createCn } from "cnfast";

/**
 * A `cn` configured for this site's type scale. Components import it from `@/lib/cn` rather than
 * `cnfast` directly — that is the whole reason this module exists, so it is not a re-export.
 *
 * ## Why the configuration is necessary
 *
 * Tailwind builds `text-*` utilities from two token namespaces: `--text-*` (font size) and
 * `--color-*` (color). The merge step knows Tailwind's stock scale (`text-sm`, `text-lg`) but
 * not our semantic names, so without this group it treats every `text-*` class as one conflict
 * group and keeps only the last — `cn("text-primary-foreground", "text-body")` would collapse
 * to `text-body`. Registering the type scale as the font-size group keeps a size and a color
 * side by side, while two sizes or two colors still resolve to the last.
 *
 * The list is the closed type scale from DESIGN.md §3, plus `text-copy` (per §3's note: `body`
 * names both a color and a size, and the color owns `text-body`). **A new size token in
 * `global.css` must be added here too** — `tools/checks/cn-font-size-group.mjs` fails the build
 * when the two diverge.
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
