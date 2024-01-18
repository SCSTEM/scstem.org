import Link from "@docusaurus/Link";
import { ActionIconProps } from "@mantine/core";
import { Button, ButtonProps } from "@nextui-org/react";
import { TablerIconsProps } from "@tabler/icons-react";
import clsx from "clsx";
import { FC } from "react";

type Props = {
  href: string;
  icon: FC<TablerIconsProps>;
} & ButtonProps &
  ActionIconProps;

export function ActionIcon(props: Props): JSX.Element {
  return (
    <Button
      isIconOnly
      className={clsx(props.className)}
      href={props.href}
      as={Link}
      variant="light"
      size="sm"
    >
      <props.icon size={18} stroke={1.5} />
    </Button>
  );
}
