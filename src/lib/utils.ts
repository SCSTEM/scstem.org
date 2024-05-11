import type { IconProps } from "@tabler/icons-react";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Icon = FC<Omit<IconProps, "ref">>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
