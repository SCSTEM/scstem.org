import { heroui } from "@heroui/react";

import { colorBases, colorScales } from "./theme";

export default heroui({
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
    fll: {
      extend: "dark",
      layout: {},
      colors: {
        background: colorScales.neutral[800],
        foreground: colorBases.white,
        focus: colorScales.blue["500"],
        divider: colorScales.gray["800"],

        primary: colorScales.orange,
        secondary: colorScales.green,
        success: colorScales.blue,
        warning: colorScales.yellow,
        danger: colorScales.red,
      },
    },
  },
});
