"use client";

import type { ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
