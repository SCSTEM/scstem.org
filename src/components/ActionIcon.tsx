import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/shadcn/ui/button";
import { cn, type Icon } from "@/lib/utils";

type Props = {
  href: string;
  icon: Icon;
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
        rel={
          href.startsWith("http") || href.startsWith("mailto:")
            ? "noopener noreferrer"
            : undefined
        }
      >
        <Icon size={18} stroke={1.5} />
      </a>
    </Button>
  );
}
