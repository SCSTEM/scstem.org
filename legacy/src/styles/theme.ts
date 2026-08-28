import type { ColorScale as NUIColorScale } from "@heroui/react";

export const colorBases: { [key: string]: string } = {
  white: "#e5e5e5",
  black: "#171717",
};

export const colorScales = {
  yellow: {
    DEFAULT: "#FACC15",
    foreground: "#171717",
    100: "#FEF9D0",
    200: "#FEF1A1",
    300: "#FDE772",
    400: "#FBDC4E",
    500: "#FACC15",
    600: "#D7AA0F",
    700: "#B38A0A",
    800: "#906C06",
    900: "#775704",
  },
  green: {
    DEFAULT: "#16A34A",
    foreground: "#FAFAFA",
    100: "#D0FACF",
    200: "#A0F5A6",
    300: "#6DE381",
    400: "#46C769",
    500: "#16A34A",
    600: "#108C4A",
    700: "#0B7547",
    800: "#075E41",
    900: "#044E3C",
  },
  blue: {
    DEFAULT: "#3B82F6",
    foreground: "#FAFAFA",
    100: "#D7ECFE",
    200: "#B0D7FE",
    300: "#89BDFC",
    400: "#6BA6F9",
    500: "#3B82F6",
    600: "#2B64D3",
    700: "#1D4AB1",
    800: "#12338E",
    900: "#0B2376",
  },
  orange: {
    DEFAULT: "#F97316",
    foreground: "#FAFAFA",
    100: "#FEEED0",
    200: "#FED7A1",
    300: "#FDBB72",
    400: "#FB9F4F",
    500: "#F97316",
    600: "#D65510",
    700: "#B33C0B",
    800: "#902707",
    900: "#771804",
  },
  red: {
    DEFAULT: "#FF3C35",
    foreground: "#FAFAFA",
    100: "#FFE5D6",
    200: "#FFC5AE",
    300: "#FF9E85",
    400: "#FF7967",
    500: "#FF3C35",
    600: "#DB262F",
    700: "#B71A2F",
    800: "#93102D",
    900: "#7A0A2C",
  },
  gray: {
    DEFAULT: "#4B5563",
    100: "#EBF2F7",
    200: "#D8E4EF",
    300: "#B1C1D0",
    400: "#8491A1",
    500: "#4B5563",
    600: "#364255",
    700: "#253047",
    800: "#172139",
    900: "#0E162F",
  },
  neutral: {
    DEFAULT: "#525252",
    100: "#e5e5e5",
    200: "#d4d4d4",
    300: "#a3a3a3",
    400: "#737373",
    500: "#525252",
    600: "#404040",
    700: "#262626",
    800: "#171717",
    900: "#0a0a0a",
  },
} satisfies { [key: string]: NUIColorScale };

export type ColorScale = keyof typeof colorScales;

export const breakpoints = {
  xs: "36em",
  sm: "48em",
  md: "62em",
  lg: "75em",
  xl: "88em",
};

export function parseColor(color?: ColorScale): string {
  if (!color) return colorScales.yellow.DEFAULT;

  return colorScales[color].DEFAULT || color[500];
}
