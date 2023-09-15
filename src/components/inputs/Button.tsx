import Link from "@docusaurus/Link";
import {
  Button as MButton,
  ButtonProps,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";

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
  // TODO: Rework colorScheme implementation here
  const colorScheme = useComputedColorScheme("dark");
  const theme = useMantineTheme();

  const from =
    colorScheme === "dark" ? theme.colors["brand-yellow"][4] : "brand-blue";
  const to = colorScheme === "dark" ? "brand-orange" : theme.colors.cyan[7];

  return (
    <Button
      variant="gradient"
      gradient={{ from, to }}
      styles={{
        label: {
          color: colorScheme === "dark" ? theme.black : theme.white,
        },
      }}
      {...props}
    />
  );
}
