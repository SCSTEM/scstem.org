import type { StaticImport as ImageStaticImport } from "next/dist/shared/lib/get-img-props";
import type { ImageProps } from "next/image";
import NextImage from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type StaticImport = ImageStaticImport;

// Helper component to wrap whatever image component we're using
export function Image({ className, ...props }: ImageProps): ReactNode {
  return <NextImage className={cn("object-contain", className)} {...props} />;
}
