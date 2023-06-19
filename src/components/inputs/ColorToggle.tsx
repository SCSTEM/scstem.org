import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorToggle(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors, white, black } = useMantineTheme();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <Switch
      checked={colorScheme === "light"}
      onChange={() => toggleColorScheme()}
      size="md"
      className="my-auto ml-2"
      onLabel={<IconSun size="1.25rem" stroke={1.5} color={black} />}
      offLabel={<IconMoonStars size="1.25rem" stroke={1.5} color={white} />}
      styles={{
        track: {
          backgroundColor:
            colorScheme === "light" ? black : colors["brand-blue"][6],
        },
      }}
    />
  );
}
