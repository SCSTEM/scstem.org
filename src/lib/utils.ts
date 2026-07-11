import type { IconProps } from "@tabler/icons-react";
import type { FC } from "react";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Icon = FC<Omit<IconProps, "ref">>;
