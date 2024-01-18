import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

import { colorBases, colorScales } from "./src/styles/theme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        mono: ["SourceCodePro"],
        heading: ["Orbitron"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        dark: {
          extend: "dark",
          layout: {},
          colors: {
            background: colorBases.black,
            foreground: colorBases.white,
            focus: colorScales.blue["500"],
            divider: colorScales.gray["800"],

            primary: colorScales.yellow,
            secondary: colorScales.blue,
            success: colorScales.green,
            warning: colorScales.orange,
            danger: colorScales.red,
          },
        },
        light: {
          extend: "light",
          layout: {},
          colors: {
            background: colorBases.white,
            foreground: colorBases.black,
            focus: colorScales.yellow["500"],
            divider: colorScales.gray["800"],

            primary: colorScales.blue,
            secondary: colorScales.yellow,
            success: colorScales.green,
            warning: colorScales.orange,
            danger: colorScales.red,
          },
        },
        bio: {
          extend: "dark",
          layout: {},
          colors: {
            background: colorBases.black,
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
