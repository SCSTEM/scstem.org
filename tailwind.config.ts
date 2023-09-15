import type { Config } from "tailwindcss";

import breakpoints from "./breakpoints.config.cjs";
import { colors, black, white, defaultShade } from "./src/styles/styles";

export default {
  darkMode: ["class", "[data-mantine-color-scheme='dark']"],
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    screens: breakpoints,
    extend: {
      fontFamily: {
        sans: ["var(--mantine-font-family)"],
        mono: ["var(--mantine-font-family-monospace)"],
        heading: ["var(--mantine-font-family-headings)"],
      },
      fontWeight: {
        heading: "var(--mantine-heading-font-weight)",
      },
      colors: {
        black,
        white,

        ...colors,
        yellow: colors["brand-yellow"][defaultShade],
        blue: colors["brand-blue"][defaultShade],
        green: colors["brand-green"][defaultShade],
        orange: colors["brand-orange"][defaultShade],
        gray: colors["brand-gray"][defaultShade],

        bio: {
          // TODO Biohazard brand colors
        },
      },
      fontSize: {
        DEFAULT: ["var(--mantine-font-size-md)", "var(--mantine-line-height)"],
        h1: ["var(--mantine-h1-font-size)", "var(--mantine-h1-line-height)"],
        h2: ["var(--mantine-h2-font-size)", "var(--mantine-h2-line-height)"],
        h3: ["var(--mantine-h3-font-size)", "var(--mantine-h3-line-height)"],
        h4: ["var(--mantine-h4-font-size)", "var(--mantine-h4-line-height)"],
        p1: ["var(--mantine-font-size-lg)", "var(--mantine-line-height)"],
        p2: ["var(--mantine-font-size-md)", "var(--mantine-line-height)"],
        p3: ["var(--mantine-font-size-sm)", "var(--mantine-line-height)"],
        p4: ["var(--mantine-font-size-xs)", "var(--mantine-line-height)"],
      },
    },
  },
} satisfies Config;
