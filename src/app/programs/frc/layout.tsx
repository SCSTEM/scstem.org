import type { ReactNode } from "react";

export default function FRCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return <div className="bio">{children}</div>;
}
