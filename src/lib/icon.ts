import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

const iconsRoot = dirname(require.resolve("@carbon/icons/svg/32/bot.svg"));

const cache = new Map<string, string>();

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

  const markup = source
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replaceAll(/<rect[^>]*fill="none"[^>]*\/>/g, "")
    .replaceAll(/<title>[\s\S]*?<\/title>/g, "")
    .trim();
  cache.set(name, markup);

  return markup;
};
