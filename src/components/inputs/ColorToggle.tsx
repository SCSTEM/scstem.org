import { useColorMode } from "@docusaurus/theme-common";
import { Switch, useMantineTheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorToggle(): JSX.Element {
  const { colorMode, setColorMode } = useColorMode();
  const { black, white, colors } = useMantineTheme();

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  useHotkeys([["mod+J", () => toggleColorMode()]]);

  return (
    <Switch
      checked={colorMode === "dark"}
      onChange={() => toggleColorMode()}
      size="md"
      className="my-auto ml-2"
      onLabel={<IconSun size="1.25rem" stroke={1.5} color={black} />}
      offLabel={<IconMoonStars size="1.25rem" stroke={1.5} color={white} />}
      styles={{
        track: {
          backgroundColor:
            colorMode === "dark"
              ? colors["brand-yellow"][5]
              : colors["brand-blue"][5],
        },
      }}
    />
  );
}
