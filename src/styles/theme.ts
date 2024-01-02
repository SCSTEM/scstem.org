import { Button, MantineColorsTuple, createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";
import { ColorScale as NUIColorScale } from "@nextui-org/react";

export type ColorScale = Exclude<NUIColorScale, string>;

// New stuff
export const colorBases: { [key: string]: string } = {
  white: "#FAFAFA",
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
    foreground: "#FAFAFA",
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
} satisfies { [key: string]: ColorScale };

// Old Stuff

export const defaultColorScheme: "dark" | "light" = "dark";

export const defaultShade = 5;

export const baseColors = {
  white: "#FAFAFA",
  black: "#171717",
};

export const colors: Record<string, MantineColorsTuple> = {
  yellow: [
    "#E6E1CF",
    "#DDD4B0",
    "#D9CA90",
    "#DCC56C",
    "#E6C644",
    "#FACC15",
    "#D7B21C",
    "#B1962A",
    "#938032",
    "#7C6E36",
  ],
  gray: [
    "#878B91",
    "#787E87",
    "#6C727C",
    "#606873",
    "#555E6A",
    "#4B5563",
    "#464D57",
    "#40454D",
    "#3B3F44",
    "#36393C",
  ],
  green: [
    "#7AAF8E",
    "#62AD7E",
    "#4BAB6F",
    "#39A762",
    "#28A455",
    "#16A34A",
    "#208646",
    "#266F41",
    "#295E3D",
    "#2A5038",
  ],
  orange: [
    "#E6D8CF",
    "#DCC2B0",
    "#D9AE90",
    "#DB9A6D",
    "#E68745",
    "#F97316",
    "#D7691D",
    "#B0622B",
    "#935A33",
    "#7B5336",
  ],
  black: [
    "#252525",
    "#222222",
    "#1F1F1F",
    "#1C1C1C",
    "#191919",
    "#171717",
    "#151515",
    "#131313",
    "#111111",
    "#0F0F0F",
  ],
  blue: [
    "#D3DCEB",
    "#B3C5E3",
    "#8FAFE2",
    "#6898E7",
    "#3B82F6",
    "#3375DF",
    "#336AC4",
    "#3B63A3",
    "#3F5B89",
    "#3F5475",
  ],
  red: [
    "#DBC5C5",
    "#D0A9A9",
    "#CB8D8D",
    "#CA6E6E",
    "#CF4D4D",
    "#DC2626",
    "#B73131",
    "#993838",
    "#813B3B",
    "#6E3C3C",
  ],
};

export const theme = createTheme({
  fontFamily: "Inter",
  fontFamilyMonospace: "SourceCodePro",
  headings: {
    fontFamily: "Orbitron",
    fontWeight: "900",
  },
  cursorType: "pointer",
  primaryColor: "blue",
  primaryShade: {
    light: defaultShade,
    dark: defaultShade,
  },
  colors: { ...colors },
  white: "#FAFAFA",
  black: "#171717",
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "xl",
      },
    }),
  },
});

export const vars = themeToVars(theme);
