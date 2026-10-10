import { site } from "@/data/site";

/** Absolute `http(s)` URLs only; root-relative and `mailto:` links are not external. */
export const isExternal = (href: string): boolean => href.startsWith("http");

export const absoluteUrl = (path: string): string => new URL(path, site.url).href;

/** A static build's `Astro.url` names the emitted `.html` file; this is the path it is served at. */
export const servedPath = (url: URL): string => url.pathname.replace(/(?:index)?\.html$/u, "");
