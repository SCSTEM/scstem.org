import type { ButtonProps } from "@heroui/button";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import type { IconProps } from "@tabler/icons-react";
import type { FC } from "react";

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
}: Props): JSX.Element {
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
