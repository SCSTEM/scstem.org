import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type ExtendedCustomColors =
  | "brand-yellow"
  | "brand-gray"
  | "brand-green"
  | "brand-orange"
  | "brand-dark"
  | "brand-blue"
  | "brand-red"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
