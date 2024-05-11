import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type LogoProps = Omit<ComponentProps<"img">, "src">;

export function LogoFullColor({ className, ...props }: LogoProps): JSX.Element {
  return (
    <img
      alt="South Central STEM Collective logo."
      {...props}
      src="/image/svg/logo-color-full.svg"
      className={cn(className)}
    />
  );
}

export function LogoColor({ className, ...props }: LogoProps): JSX.Element {
  return (
    <img
      alt="Square South Central STEM Collective logo."
      {...props}
      src="/image/svg/logo-color.svg"
      className={cn(className)}
    />
  );
}