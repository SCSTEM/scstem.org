import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

/**
 * Reads Tabler icon source at build time and returns just its inner markup, so `Icon.astro`
 * can wrap it in an `<svg>` carrying our own size and accessibility attributes
 * (docs/adr/0002-tabler-icons-direct.md).
 *
 * Static output means this runs during `astro build` and never in a browser. Only the icons a
 * page actually references are read, and the package itself never ships.
 */

const require = createRequire(import.meta.url);

/**
 * The package's `exports` map is `"./*": "./icons/*"`, which rewrites *every* subpath —
 * including `package.json`, so the manifest cannot be resolved. Locate the icons directory
 * through a known icon instead.
 */
const iconsRoot = dirname(dirname(require.resolve("@tabler/icons/outline/robot.svg")));

const cache = new Map<string, string>();

export type IconStyle = "outline" | "filled";

/**
 * Inner markup of a Tabler icon — the `<path>` elements without the wrapping `<svg>`.
 *
 * @param name Tabler's own icon name, as shown on tabler.io/icons (e.g. `robot`, `brand-instagram`).
 * @throws If the icon does not exist, so a typo fails the build instead of rendering nothing.
 */
export const iconMarkup = (name: string, style: IconStyle = "outline"): string => {
  const key = `${style}/${name}`;
  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached;
  }

  let source: string;
  try {
    source = readFileSync(join(iconsRoot, style, `${name}.svg`), "utf8");
  } catch {
    throw new Error(
      `Unknown Tabler icon "${name}" (${style}). Check the name at https://tabler.io/icons.`,
    );
  }

  // Drop the wrapping <svg> element; Icon.astro supplies its own with our attributes.
  const inner = source.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  // Tabler ships a transparent bounding-box path in every outline icon; it renders nothing.
  const withoutBoundingBox = inner.replace(
    /<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/,
    "",
  );

  const markup = withoutBoundingBox.trim();
  cache.set(key, markup);

  return markup;
};
