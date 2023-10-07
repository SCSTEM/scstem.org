import { ThemeIconProps, ThemeIcon as MThemeIcon } from "@mantine/core";

import classes from "./ThemeIcon.module.css";

export function ThemeIcon(props: ThemeIconProps): JSX.Element {
  return <MThemeIcon classNames={classes} variant={"default"} {...props} />;
}
