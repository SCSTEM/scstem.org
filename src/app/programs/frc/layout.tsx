import type { ReactNode } from "react";

export default function FrcLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return <div data-theme="bio">{children}</div>;
}
