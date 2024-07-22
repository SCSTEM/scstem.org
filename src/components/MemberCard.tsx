"use client";

import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  image?: string;
};

export function MemberCard({ children, image }: Props): JSX.Element {
  return (
    <>
      <div className="border-r-8">
        <img src={image} alt="image" />
        {children}
      </div>
    </>
  );
}
