import {
  MantineGradient,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface Props {
  theme?: "light" | "dark";
  gradient?: MantineGradient;
  className?: string;
  children: ReactNode;
}

export default function Highlight({
  children,
  theme,
  gradient,
  className,
}: Props) {
  const siteTheme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const from =
    colorScheme === "dark" || theme === "dark"
      ? siteTheme.colors["brand-yellow"][5]
      : siteTheme.colors["brand-blue"][5];
  const to =
    colorScheme === "dark" || theme === "dark"
      ? siteTheme.colors["brand-orange"][7]
      : siteTheme.colors.cyan[7];

  return (
    <Text
      variant="gradient"
      gradient={gradient ? gradient : { from, to, deg: 0 }}
      className={clsx("leading-none", className)}
      span
    >
      {children}
    </Text>
  );
}
