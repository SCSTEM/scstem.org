import { parseThemeColor, useMantineTheme } from "@mantine/core";
import { clsx } from "clsx";

import { ExtendedCustomColors } from "@site/src";

type Props = {
  children: React.ReactNode;
  className?: string;
  color?: ExtendedCustomColors;
};

export default function Underline({
  className,
  children,
  color,
}: Props): JSX.Element {
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({
    color: theme.colors[color || "yellow"][5],
    theme,
  });

  return (
    <span
      className={clsx("underline underline-offset-4", className)}
      style={{
        textDecorationColor: parsedColor.isThemeColor
          ? `var(${parsedColor.variable})`
          : parsedColor.value,
      }}
    >
      {children}
    </span>
  );
}
