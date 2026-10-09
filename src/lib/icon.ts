import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

/**
 * Reads IBM Carbon icon source at build time and returns just its inner markup, so `Icon.astro`
 * can wrap it in an `<svg>` carrying our own size and accessibility attributes.
 *
 * Static output means this runs during `astro build` and never in a browser. Only the icons a
 * page actually references are read, and the package itself never ships.
 */

const require = createRequire(import.meta.url);

/** The 32px masters, drawn on Carbon's 32-unit grid; every rendered size scales from them. */
const iconsRoot = dirname(require.resolve("@carbon/icons/svg/32/bot.svg"));

const cache = new Map<string, string>();

/**
 * Inner markup of a Carbon icon — its shapes without the wrapping `<svg>`, drawn on a
 * `0 0 32 32` grid and filled with the SVG's own `fill`.
 *
 * @param name Carbon's own icon name, as shown on carbondesignsystem.com (e.g. `bot`,
 *   `logo--github`, `chevron--down`).
 * @throws If the icon does not exist, so a typo fails the build instead of rendering nothing.
 */
export const iconMarkup = (name: string): string => {
  const cached = cache.get(name);
  if (cached !== undefined) {
    return cached;
  }

  let source: string;
  try {
    source = readFileSync(join(iconsRoot, `${name}.svg`), "utf8");
  } catch {
    throw new Error(
      `Unknown Carbon icon "${name}". Check the name at https://carbondesignsystem.com/elements/icons/library/.`,
    );
  }

  if (!source.includes('viewBox="0 0 32 32"')) {
    throw new Error(`Carbon icon "${name}" is not drawn on the 32-unit grid Icon.astro assumes.`);
  }

  // Drop the wrapping <svg>; Icon.astro supplies its own. Some sources carry a transparent
  // bounding-box rect, which renders nothing.
  const markup = source
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replaceAll(/<rect[^>]*fill="none"[^>]*\/>/g, "")
    .replaceAll(/<title>[\s\S]*?<\/title>/g, "")
    .trim();
  cache.set(name, markup);

  return markup;
};
