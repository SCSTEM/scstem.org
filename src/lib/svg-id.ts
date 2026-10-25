import type { AstroGlobal } from "astro";

const sequences = new WeakMap<AstroGlobal["locals"], number>();

/** Astro.locals scopes the sequence to a page render, including its nested components. */
export const nextSvgId = (locals: AstroGlobal["locals"]): string => {
  const next = (sequences.get(locals) ?? 0) + 1;
  sequences.set(locals, next);
  return `svg-${String(next)}`;
};
