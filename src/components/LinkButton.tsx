"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { Button, type ButtonProps } from "@/components/shadcn/ui/button";

type LinkButtonProps = ButtonProps & {
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
};

export function LinkButton({
  href,
  target,
  rel,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Button asChild {...props}>
      <Link href={href} target={target} rel={rel}>
        {children}
      </Link>
    </Button>
  );
}
