import { MantineColorsTuple } from "@mantine/core";
import type { Config } from "tailwindcss";
import twColors from "tailwindcss/colors";

import breakpoints from "./breakpoints.config.cjs";
import { colors, baseColors } from "./src/styles/theme";

delete twColors["lightBlue"];
delete twColors["warmGray"];
delete twColors["trueGray"];
delete twColors["coolGray"];
delete twColors["blueGray"];

type twColor = { [key: number]: string };

function adaptColors(
  colors: Record<string, MantineColorsTuple>,
): Record<string, twColor> {
  const result: Record<string, twColor> = {};

  for (const [key, value] of Object.entries(colors)) {
    result[key] = adaptShade(value);
  }

  return result;
}

function adaptShade(shades: MantineColorsTuple): twColor {
  const convertedShades: twColor = {};

  let index = 0;
  for (const shade of shades) {
    convertedShades[index] = shade;
    index += 100;
  }

  return convertedShades;
}

export default {
  darkMode: ["class", "[data-mantine-color-scheme='dark']"],
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    screens: breakpoints,
    colors: {
      transparent: "transparent",
      inherit: "inherit",

      white: baseColors.white,
      black: baseColors.black,

      ...adaptColors(colors),
    },
    extend: {
      fontFamily: {
        sans: ["Inter"],
        mono: ["SourceCodePro"],
        heading: ["Orbitron"],
      },
      fontWeight: {
        heading: "var(--mantine-heading-font-weight)",
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
