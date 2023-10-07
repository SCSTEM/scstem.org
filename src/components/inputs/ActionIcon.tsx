import Link from "@docusaurus/Link";
import { ActionIconProps } from "@mantine/core";
import { ActionIcon as MActionIcon } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import { FC } from "react";

import classes from "./ActionIcon.module.css";

type Props = {
  to: string;
  icon: FC<TablerIconsProps>;
  className?: string;
} & ActionIconProps;

export function ActionIcon(props: Props): JSX.Element {
  return (
    <MActionIcon
      className={props.className}
      classNames={classes}
      variant={props.variant ?? "default"}
      component={Link}
      to={props.to}
    >
      <props.icon size={18} stroke={1.5} />
    </MActionIcon>
  );
}
