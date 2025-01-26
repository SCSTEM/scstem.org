import type { ReactNode, JSX } from "react";

import { cn } from "@/lib/utils";
import { parseColor, type ColorScale } from "@/styles/theme";

type HighlightProps = {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  color?: ColorScale;
};

export function Highlight({
  children,
  className,
  gradient,
  color,
}: HighlightProps): ReactNode {
  return (
    <span
      className={cn(
        "leading-none text-primary",
        gradient
          ? "bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-orange-500"
          : null,
        className,
      )}
      style={{
        color: color ? parseColor(color) : undefined,
      }}
    >
      {children}
    </span>
  );
}

type UnderlineProps = {
  children: React.ReactNode;
  className?: string;
  color?: ColorScale;
};

export function Underline({
  className,
  children,
  color,
}: UnderlineProps): ReactNode {
  return (
    <span
      className={cn(
        "underline underline-offset-4 decoration-primary",
        className,
      )}
      style={{
        textDecorationColor: color ? parseColor(color) : undefined,
      }}
    >
      {children}
    </span>
  );
}
