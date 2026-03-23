import type { IconProps } from "@tabler/icons-react";
import type { FC, ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  icon: FC<Omit<IconProps, "ref">>;
} & Omit<ButtonProps, "asChild">;

export function ActionIcon({
  href,
  className,
  icon: Icon,
  ...restProps
}: Props): ReactNode {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      asChild
      {...restProps}
    >
      <a
        href={href}
        target={
          href.startsWith("http") || href.startsWith("mailto:")
            ? "_blank"
            : undefined
        }
        rel="noopener noreferrer"
      >
        <Icon size={18} stroke={1.5} />
      </a>
    </Button>
  );
}
