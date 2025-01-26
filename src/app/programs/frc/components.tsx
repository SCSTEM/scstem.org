"use client";

import type { ReactNode, JSX } from "react";
import { ParallaxBanner } from "react-scroll-parallax";

import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode;
  background?: string;
  classNames?: {
    image?: string;
  };
};

export function ParallaxImage({
  children,
  background,
  classNames,
}: Props): ReactNode {
  return (
    <ParallaxBanner
      className="h-[400px] lg:h-[600px]"
      layers={[
        {
          image: background,
          className: cn(classNames?.image),
          speed: -15,
        },
        {
          speed: -15,
          children,
        },
      ]}
    />
  );
}
