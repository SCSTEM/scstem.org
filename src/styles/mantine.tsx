import "@mantine/carousel/styles.css";
import {
  ColorSchemeScript,
  MantineColorScheme,
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { colors, defaultColorScheme, defaultShade } from "./styles";

const colorSchemeManager = localStorageColorSchemeManager({ key: "theme" });

const theme = createTheme({
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
  components: {
    ActionIcon: {
      defaultProps: {
        variant: "transparent",
      },
    },
    Button: {
      defaultProps: {
        radius: "xl",
      },
      styles: (theme, { variant }) => ({
        inner: {
          color:
            variant === "filled" && theme.colorScheme === "dark"
              ? theme.black
              : theme.white,
        },
      }),
    },
  },
});

type RootStyleRegistryProps = {
  children: React.ReactNode;
};

export default function RootStyleRegistry({
  children,
}: RootStyleRegistryProps) {
  return (
    <>
      <ColorSchemeScript
        defaultColorScheme={defaultColorScheme as MantineColorScheme}
      />
      <MantineProvider
        defaultColorScheme={defaultColorScheme as MantineColorScheme}
        colorSchemeManager={colorSchemeManager}
        theme={theme}
      >
        {children}
      </MantineProvider>
    </>
  );
}
