"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </HeroUIProvider>
  );
}
