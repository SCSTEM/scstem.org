import { useMantineTheme } from "@mantine/core";

import Button, { Props } from "./Button";

export default function BrandButton(props: Props): JSX.Element {
  const theme = useMantineTheme();

  const from = theme.colorScheme === "dark" ? "brand-yellow" : "brand-blue";
  const to = theme.colorScheme === "dark" ? "brand-orange" : "brand-green";

  return (
    <Button
      {...props}
      variant="gradient"
      gradient={{ from, to }}
      styles={{
        label: {
          color: theme.colorScheme === "dark" ? theme.black : theme.white,
        },
      }}
    />
  );
}
