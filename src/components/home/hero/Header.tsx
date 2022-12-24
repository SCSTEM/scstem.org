import React from "react";
import BrandGradient from "../../BrandGradient";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function HeroHeader({
  children,
  className,
}: Props): JSX.Element {
  return (
    <header
      className={`${className} flex h-[calc(100vh-var(--ifm-navbar-height))] flex-col pt-52 md:h-96 md:pt-20`}
    >
      <BrandGradient className="absolute -z-10 h-full w-full" />
      <div className="flex-grow">{children}</div>
      <button
        id="scrollButton"
        className="mx-auto mb-6 flex cursor-pointer flex-col border-none bg-transparent p-0 text-lg font-medium outline-none md:hidden"
        onClick={() =>
          document
            .getElementById("scrollButton")
            .scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        Find out more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mx-auto mt-4 h-10 w-10 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </header>
  );
}
