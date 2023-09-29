import { useComputedColorScheme } from "@mantine/core";

import { defaultColorScheme } from "../styles/theme";

export function useColorScheme(): "light" | "dark" {
  return useComputedColorScheme(defaultColorScheme);
}
