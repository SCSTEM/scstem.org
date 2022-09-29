import React from "react";

interface Props {
  value: string;
  href: string;
  outline?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
}

export default function Button({
  value,
  outline,
  href,
  target,
}: Props): JSX.Element {
  const button = outline ? (
    <button className="btn btn-outline btn-primary">{value}</button>
  ) : (
    <button className="btn btn-primary">{value}</button>
  );

  return (
    <a href={href} target={target}>
      {button}
    </a>
  );
}
