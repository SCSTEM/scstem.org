"use client";

import type { ReactNode } from "react";
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
      className="h-100 lg:h-150"
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
