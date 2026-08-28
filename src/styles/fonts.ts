import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import orbitronLatin from "@fontsource-variable/orbitron/files/orbitron-latin-wght-normal.woff2?url";

/**
 * The two faces that render above the fold on every page, for `<link rel="preload">` in
 * BaseLayout. Source Code Pro and Architects Daughter are deliberately absent: their first
 * paint is below the fold, and preloading four faces costs more than it saves.
 *
 * These are the same emitted assets the `@font-face` rules in `fonts.css` point at, so a
 * preload always matches the URL the face resolves to.
 */
export const preloadedFonts = [interLatin, orbitronLatin] as const;
