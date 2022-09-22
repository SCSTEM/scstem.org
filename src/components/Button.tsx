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
  // TODO: Outline mode

  return (
    <a href={href} target={target}>
      <button className="inline-block px-6 py-2 border-none bg-primary text-dark text-lg leading-tight rounded-xl shadow-md hover:filter hover:brightness-75 hover:shadow-lg focus:filter focus:brightness-75 focus:shadow-lg focus:outline-none focus:ring-0 active:filter active:brightness-125 active:shadow-lg transition duration-200 ease-in-out cursor-pointer">
        {value}
      </button>
    </a>
  );
}
