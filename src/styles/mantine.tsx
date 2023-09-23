import "@mantine/carousel/styles.css";
import {
  ColorSchemeScript,
  MantineColorScheme,
  MantineProvider,
  localStorageColorSchemeManager,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./overrides.css";
import { defaultColorScheme, theme } from "./theme";

const colorSchemeManager = localStorageColorSchemeManager({ key: "theme" });

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
