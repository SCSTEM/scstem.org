import type { ReactNode } from "react";

export default function FllLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return <div data-theme="fll">{children}</div>;
}
