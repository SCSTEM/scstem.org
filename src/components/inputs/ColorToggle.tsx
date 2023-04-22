import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorToggle(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Switch
      checked={colorScheme === "dark"}
      onChange={() => toggleColorScheme()}
      size="md"
      className="my-auto ml-2"
      onLabel={
        <IconSun size="1.25rem" stroke={1.5} color={theme.colors.dark[6]} />
      }
      offLabel={<IconMoonStars size="1.25rem" stroke={1.5} />}
    />
  );
}
