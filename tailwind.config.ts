import type { Config } from "tailwindcss";

import { colors, black, white } from "./src/styles/styles";

export default {
  darkMode: ["class", "[data-theme='dark']"],
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    screens: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
    },
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
        yellow: colors["brand-yellow"][5],
        blue: colors["brand-blue"][5],
        green: colors["brand-green"][5],
        orange: colors["brand-orange"][5],
        gray: colors["brand-gray"][5],

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
