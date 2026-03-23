import NextImage from "next/image";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type LogoProps = Omit<ComponentProps<"img">, "src" | "width" | "height">;

export function LogoFullColor({ className, ...props }: LogoProps): ReactNode {
  return (
    <NextImage
      alt="South Central STEM Collective logo."
      {...props}
      src="/image/svg/logo-color-full.svg"
      width={400}
      height={80}
      className={cn(className)}
    />
  );
}

export function LogoColor({ className, ...props }: LogoProps): ReactNode {
  return (
    <NextImage
      alt="Square South Central STEM Collective logo."
      {...props}
      src="/image/svg/logo-color.svg"
      width={50}
      height={50}
      className={cn(className)}
    />
  );
}
