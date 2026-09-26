import { site } from "@/data/site";

/**
 * Whether a link leaves the site for another one: an absolute `http(s)` URL. Root-relative hrefs
 * and `mailto:` are not, so they take neither the external marker nor `rel="noopener"`.
 */
export const isExternal = (href: string): boolean => href.startsWith("http");

/** A site-root-relative path, or an asset's URL, made absolute against the production origin. */
export const absoluteUrl = (path: string): string => new URL(path, site.url).href;
