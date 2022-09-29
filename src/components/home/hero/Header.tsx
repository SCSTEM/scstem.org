import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function HeroHeader({ children }: Props): JSX.Element {
  return (
    <header className="bg-[url('/svg/circuit-board-light.svg')] dark:bg-[url('/svg/circuit-board-dark.svg')] h-screen md:h-[40vh]">
      <div className="flex flex-col pt-36 md:px-48">{children}</div>
    </header>
  );
}
