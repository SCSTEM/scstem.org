import { Button, type ButtonProps, Link } from "@heroui/react";
import type { IconProps } from "@tabler/icons-react";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  icon: FC<Omit<IconProps, "ref">>;
} & ButtonProps;

export function ActionIcon({
  href,
  className,
  icon: Icon,
  ...restProps
}: Props): ReactNode {
  return (
    <Button
      isIconOnly
      className={cn(className)}
      href={href}
      as={Link}
      variant="light"
      size="sm"
      color="primary"
      {...restProps}
    >
      <Icon size={18} stroke={1.5} />
    </Button>
  );
}
