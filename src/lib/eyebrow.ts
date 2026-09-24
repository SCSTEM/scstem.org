/**
 * The class an eyebrow label takes (DESIGN.md §3). An eyebrow is Orbitron, except one that
 * carries a numeral — an age range, a season span, an error code — which is data and speaks in
 * the Source Code Pro `spec-label` voice, as the same figures do in a chip. Both are set in the
 * text-safe `primary-bright` (§2 fill-vs-text law).
 *
 * `html` is the rendered slot, so tags and character references are dropped before looking for
 * a digit: `&#8211;` is a dash, not a number.
 */
export const eyebrowClass = (html: string): string => {
  const text = html.replaceAll(/<[^>]*>|&[#\w]+;/gu, "");
  return `${/\d/u.test(text) ? "spec-label" : "eyebrow"} text-primary-bright`;
};
