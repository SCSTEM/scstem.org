import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

import { colorBases, colorScales } from "./src/styles/theme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-scp)"],
        heading: ["var(--font-orbitron)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        dark: {
          extend: "dark",
          layout: {},
          colors: {
            background: colorScales.neutral[800],
            foreground: colorBases.white,
            focus: colorScales.yellow["500"],
            divider: colorScales.gray["800"],

            primary: colorScales.yellow,
            secondary: colorScales.blue,
            success: colorScales.green,
            warning: colorScales.orange,
            danger: colorScales.red,
          },
        },
        bio: {
          extend: "dark",
          layout: {},
          colors: {
            background: colorScales.neutral[800],
            foreground: colorBases.white,
            focus: colorScales.blue["500"],
            divider: colorScales.gray["800"],

            primary: colorScales.green,
            secondary: colorScales.yellow,
            success: colorScales.blue,
            warning: colorScales.orange,
            danger: colorScales.red,
          },
        },
      },
    }),
  ],
};

export default config;
