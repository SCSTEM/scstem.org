import type { ButtonProps } from "@nextui-org/button";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
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
