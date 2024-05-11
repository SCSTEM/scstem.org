import type { StaticImport as ImageStaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import type { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

export type StaticImport = ImageStaticImport;

// Helper component to wrap whatever image component we're using
export function Image({ className, ...props }: ImageProps): JSX.Element {
  // if (typeof props.src === "string" || props.src instanceof String) {
  //   return <img {...props} src={props.src as string} />;
  // }
  return <NextImage className={cn("object-contain", className)} {...props} />;
}
