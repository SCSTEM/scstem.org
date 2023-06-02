import { useColorMode } from "@docusaurus/theme-common";
import {
  ColorScheme,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorToggle(): JSX.Element {
  const { colorMode, setColorMode } = useColorMode();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors, white, black } = useMantineTheme();

  const toggle = (theme?: ColorScheme) => {
    const isDark = theme ? theme === "dark" : colorMode === "dark";

    setColorMode(isDark ? "light" : "dark");
    toggleColorScheme(isDark ? "light" : "dark");
  };

  useHotkeys([["mod+J", () => toggle()]]);

  return (
    <Switch
      checked={colorMode === "dark"}
      onChange={() => toggle()}
      size="md"
      className="my-auto ml-2"
      onLabel={<IconSun size="1.25rem" stroke={1.5} color={black} />}
      offLabel={<IconMoonStars size="1.25rem" stroke={1.5} color={white} />}
      styles={{
        track: {
          backgroundColor:
            colorScheme === "dark" ? black : colors["brand-blue"][6],
        },
      }}
    />
  );
}
