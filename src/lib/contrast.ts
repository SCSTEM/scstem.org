/**
 * WCAG 2.2 relative-luminance contrast, used by `/styleguide` to verify every token pair at
 * build time (DESIGN.md §9). Kept dependency-free so a token change re-verifies on `pnpm build`.
 */

/** Floors from DESIGN.md §9: AAA for anything longer than a caption, AA everywhere else. */
export const AA_NORMAL = 4.5;
export const AAA_NORMAL = 7;

const channels = (hex: string): readonly number[] => {
  const digits = hex.replace("#", "");
  return [0, 2, 4].map((offset) => Number.parseInt(digits.slice(offset, offset + 2), 16));
};

const channelLuminance = (channel: number): number => {
  const proportion = channel / 255;
  return proportion <= 0.03928 ? proportion / 12.92 : ((proportion + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (hex: string): number => {
  const [red = 0, green = 0, blue = 0] = channels(hex);

  return (
    0.2126 * channelLuminance(red) +
    0.7152 * channelLuminance(green) +
    0.0722 * channelLuminance(blue)
  );
};

/** Contrast ratio between two six-digit hex colors, from 1 (identical) to 21 (black on white). */
export const contrastRatio = (foreground: string, background: string): number => {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return (lighter + 0.05) / (darker + 0.05);
};

/** Rounded down, so a displayed 7.0 is never a 6.95 that failed. */
export const formatRatio = (ratio: number): string =>
  `${(Math.floor(ratio * 10) / 10).toFixed(1)}:1`;

/**
 * Composites a translucent foreground over an opaque background, so a ratio can be measured
 * against what a viewer actually sees. Needed for the highlighter swipe, which is `primary`
 * at partial alpha over the page ground (DESIGN.md §2.13).
 */
export const blend = (foreground: string, background: string, alpha: number): string => {
  const front = channels(foreground);
  const back = channels(background);

  const mixed = front.map((channel, index) => {
    const behind = back[index] ?? 0;
    return Math.round(alpha * channel + (1 - alpha) * behind);
  });

  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
};
