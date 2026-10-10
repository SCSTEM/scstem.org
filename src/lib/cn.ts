import { createCn } from "cn/config";

/**
 * Registers the type-scale tokens as the `font-size` group, so `cn("text-primary-foreground",
 * "text-copy")` keeps both instead of treating every `text-*` class as one conflict.
 *
 * The list mirrors the `--text-*` type-scale tokens by hand: a size token missing here loses to any
 * color class beside it with no error, only a wrong size in the browser.
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
