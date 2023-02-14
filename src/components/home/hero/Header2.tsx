import { clsx } from "clsx";
import { Overlay, Container as div } from "@mantine/core";
import React from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface Props {
  fullscreen?: boolean;
  img: string;
  children: React.ReactNode;
}

export default function HeroHeader2({
  img,
  fullscreen,
  children,
}: Props): JSX.Element {
  return (
    <header
      className={clsx(
        fullscreen ? null : "md:h-[600px]",
        "relative h-[calc(101vh-var(--ifm-navbar-height))] border-0 border-b-2 border-solid border-dark dark:border-primary"
      )}
    >
      <div className="absolute -z-0 h-full w-full">
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 40%)"
          opacity={1}
        />

        <img src={img} className={clsx("-z-10 h-full w-full object-cover")} />
      </div>
      <div className="absolute flex h-full flex-col">
        <div
          className={clsx(
            fullscreen ? "md:mt-60 md:h-screen" : "h-full md:mt-48",
            "z-10 mx-8 mt-10 flex-grow md:m-0 md:ml-36 md:w-9/12 lg:ml-60 lg:w-1/2"
          )}
        >
          {children}
        </div>
        <button
          id="scrollButton"
          className="mx-auto mb-20 flex cursor-pointer flex-col items-center border-none bg-transparent p-0 text-lg font-medium outline-none dark:text-primary md:hidden"
          onClick={() =>
            document
              .getElementById("scrollButton")
              .scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          Find out more
          <IconChevronDown size={50} stroke={1.5} className="animate-bounce" />
        </button>
      </div>
    </header>
  );
}
