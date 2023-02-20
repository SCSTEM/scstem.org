import { Overlay } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { clsx } from "clsx";
import React from "react";

interface Props {
  fullscreen?: boolean;
  img: string;
  children: React.ReactNode;
}

export default function HeroHeader({
  img,
  fullscreen,
  children,
}: Props): JSX.Element {
  return (
    <header
      className={clsx(
        fullscreen ? null : "md:h-[500px]",
        "relative h-[calc(101vh-var(--ifm-navbar-height))] border-0 border-b-2 border-solid border-blue dark:border-primary w-full"
      )}
    >
      <div className="absolute -z-0 h-full w-full">
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
        />

        <img src={img} className="-z-10 h-full w-full object-cover" />
      </div>
      <div className="absolute flex h-full flex-col">
        <div
          className={clsx(
            fullscreen ? "md:mt-60 md:h-screen" : "h-full md:mt-48",
            "sm:mx-8 ml-2 mt-20 flex-grow md:m-0 md:ml-36 lg:ml-60 w-full sm:w-[600px] md:w-[800px] lg:w-[1000px]"
          )}
        >
          {children}
        </div>
        <button
          className="mx-auto mb-10 flex cursor-pointer flex-col items-center border-none bg-transparent p-0 text-lg font-medium outline-none text-primary md:hidden"
          onClick={() =>
            document
              .getElementById("scrollhere")
              .scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          Find out more
          <IconChevronDown
            size={50}
            stroke={1.5}
            className="animate-bounce mt-1"
          />
        </button>
        {/* This is a hack to scroll to the top of the body */}
        <div id="scrollhere" className="mb-10"></div>
      </div>
    </header>
  );
}
