import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
};

export default function Highlight({
  children,
  className,
  gradient,
}: Props): JSX.Element {
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
