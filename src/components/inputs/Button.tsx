import Link from "@docusaurus/Link";
import { Button as MButton, ButtonProps, useMantineTheme } from "@mantine/core";

type Props = {
  to: string;
} & ButtonProps;

export function Button(props: Props): JSX.Element {
  return (
    <Link to={props.to}>
      <MButton {...props}>{props.children}</MButton>
    </Link>
  );
}

export function BrandButton(props: Props): JSX.Element {
  const theme = useMantineTheme();

  const from =
    theme.colorScheme === "dark"
      ? theme.colors["brand-yellow"][4]
      : "brand-blue";
  const to =
    theme.colorScheme === "dark" ? "brand-orange" : theme.colors.cyan[7];

  return (
    <Button
      variant="gradient"
      gradient={{ from, to }}
      styles={{
        label: {
          color: theme.colorScheme === "dark" ? theme.black : theme.white,
        },
      }}
      {...props}
    />
  );
}
