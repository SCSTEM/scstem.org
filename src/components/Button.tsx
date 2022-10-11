import React from "react";

interface Props {
  children: React.ReactNode;
  outline?: boolean;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export default function Button({
  children,
  outline,
  href,
  target,
}: Props): JSX.Element {
  let button = <button className="btn btn-primary">{children}</button>;

  if (outline)
    button = (
      <button className="btn btn-outline btn-primary">{children}</button>
    );

  return (
    <a href={href} target={target}>
      {button}
    </a>
  );
}
