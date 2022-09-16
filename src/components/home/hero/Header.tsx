import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function HeroHeader({ children }: Props): JSX.Element {
  return (
    <header className="dark:bg-[url('/svg/circuit-board-dark.svg')] bg-[url('/svg/circuit-board-light.svg')] h-[40vh]">
      <div className="flex flex-col md:pt-36 md:px-48">{children}</div>
    </header>
  );
}
