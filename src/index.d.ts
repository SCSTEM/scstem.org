import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type ExtendedCustomColors =
  | "yellow"
  | "gray"
  | "green"
  | "orange"
  | "dark"
  | "blue"
  | "red"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
