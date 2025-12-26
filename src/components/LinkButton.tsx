"use client";

import { Button, type ButtonProps } from "@heroui/button";
import Link from "next/link";

export function LinkButton(props: ButtonProps & { href: string }) {
  return <Button as={Link} {...props} />;
}
