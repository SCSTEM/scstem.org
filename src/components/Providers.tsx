"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ParallaxProvider } from "react-scroll-parallax";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </HeroUIProvider>
  );
}
