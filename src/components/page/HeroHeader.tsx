"use client";

import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  fullscreen?: boolean;
  img: string;
  children: ReactNode;
}

export default function HeroHeader({
  img,
  fullscreen,
  children,
}: Props): JSX.Element {
  return (
    <div
      className={cn(
        fullscreen ? null : "sm:h-[500px]",
        "relative h-[calc(101vh-4rem)] border-0 border-b-2 border-solid border-primary-500 w-full",
      )}
    >
      <div className="absolute -z-0 size-full">
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.9)0%,rgba(0,0,0,.8)50%)] size-full absolute dark:opacity-1 opacity-60" />
        <img
          id="header-image"
          src={img}
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="absolute flex size-full flex-col">
        <div
          className={cn(
            fullscreen ? "md:mt-44 md:ml-36" : "",
            "w-full md:w-[750px] lg:w-[1000px]",
            "md:ml-28 mt-8 md:mt-28",
            "px-8 md:px-0 ",
          )}
        >
          {children}
        </div>
        <button
          className={cn(
            fullscreen ? "" : "sm:hidden",
            "mx-auto mb-10 flex cursor-pointer flex-col items-center border-none bg-transparent p-0 text-lg font-medium outline-none text-primary mt-auto",
          )}
          onClick={() =>
            document
              .getElementById("scrollhere")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
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
    </div>
  );
}
