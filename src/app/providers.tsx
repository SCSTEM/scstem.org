"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ParallaxProvider } from "react-scroll-parallax";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </NextUIProvider>
  );
}
