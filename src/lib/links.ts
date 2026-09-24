/**
 * Whether a link leaves the site for another one: an absolute `http(s)` URL. Root-relative hrefs
 * and `mailto:` are not, so they take neither the external marker nor `rel="noopener"`.
 */
export const isExternal = (href: string): boolean => href.startsWith("http");
