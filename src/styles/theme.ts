import {
  ActionIcon,
  Button,
  MantineColorsTuple,
  VariantColorsResolver,
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
} from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const defaultColorScheme: "dark" | "light" = "dark";

export const defaultShade = 5;

export const white = "#FAFAFA";
export const black = "#171717";

export const colors: Record<string, MantineColorsTuple> = {
  "brand-yellow": [
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
  "brand-gray": [
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
  "brand-green": [
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
  "brand-orange": [
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
  "brand-dark": [
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
  "brand-blue": [
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
  "brand-red": [
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

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (input.variant === "outline") {
    return {
      ...defaultResolvedColors,
      color: parsedColor.value,
      border: parsedColor.value,
    };
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  fontFamily: "Inter",
  fontFamilyMonospace: "SourceCodePro",
  headings: {
    fontFamily: "Orbitron",
  },
  cursorType: "pointer",
  primaryColor: "brand-yellow",
  primaryShade: {
    light: defaultShade,
    dark: defaultShade,
  },
  colors: { ...colors },
  variantColorResolver,
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "transparent",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: "xl",
      },
    }),
  },
});

export const vars = themeToVars(theme);