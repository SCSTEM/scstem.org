import { CacheProvider } from "@emotion/react";
import {
  ButtonStylesParams,
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";

import { colors, black, white, breakpoints } from "../../styles/styles";

type RootStyleRegistryProps = {
  children: React.ReactNode;
};

export default function RootStyleRegistry({
  children,
}: RootStyleRegistryProps) {
  const cache = createEmotionCache({ key: "mtne", prepend: true });

  const colorScheme: ColorScheme = "dark";

  const theme: MantineThemeOverride = {
    breakpoints,
    fontFamily: "Inter",
    fontFamilyMonospace: "SourceCodePro",
    headings: {
      fontFamily: "Orbitron",
    },
    cursorType: "pointer",
    colorScheme,
    primaryColor: colorScheme === "dark" ? "brand-yellow" : "brand-blue",
    primaryShade: {
      light: 5,
      dark: 5,
    },
    white: white,
    black: black,
    colors: { ...colors },
    globalStyles: (theme) => ({
      "--ifm-link-color": "inherit",
      "--ifm-link-hover-color": theme.primaryColor[5],
      a: {
        ":hover": {
          textDecoration: "none",
        },
      },
    }),
    components: {
      // Sane defaults for ActionIcons
      ActionIcon: {
        defaultProps: {
          variant: "transparent",
        },
        // Set outline color
        // styles: (theme) => ({
        //   root: {
        //     ":hover": {
        //       color: theme.primaryColor[5],
        //     },
        //   },
        // }),
      },
      Button: {
        defaultProps: {
          radius: "xl",
        },
        styles: (theme, _params: ButtonStylesParams, { variant }) => ({
          inner: {
            color:
              variant === "filled" && theme.colorScheme === "dark"
                ? theme.black
                : theme.white,
          },
        }),
      },
    },
  };

  return (
    <CacheProvider value={cache}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={null}>
        <MantineProvider
          withGlobalStyles
          withCSSVariables
          withNormalizeCSS
          theme={theme}
        >
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </CacheProvider>
  );
}
