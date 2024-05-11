import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { parseColor, type ColorScale } from "@/styles/theme";

type HighlightProps = {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
};

export function Highlight({
  children,
  className,
  gradient,
}: HighlightProps): JSX.Element {
  return (
    <span
      className={cn(
        "leading-none text-primary",
        gradient
          ? "bg-clip-text text-transparent bg-gradient-to-r from-primary-400 dark:to-orange-500 light:to-cyan-700"
          : null,
        className,
      )}
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
}: UnderlineProps): JSX.Element {
  return (
    <span
      className={cn("underline underline-offset-4", className)}
      style={{
        textDecorationColor: parseColor(color),
      }}
    >
      {children}
    </span>
  );
}
