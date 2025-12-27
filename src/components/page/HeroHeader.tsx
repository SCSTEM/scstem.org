"use client";

import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  img: string;
  children: ReactNode;
  centered?: boolean;
  classNames?: {
    image?: string;
    content?: string;
  };
}

export default function HeroHeader({
  img,
  children,
  centered = false,
  classNames,
}: Props): ReactNode {
  return (
    <div className="sm:h-125 relative h-[calc(101vh-4rem)] border-0 border-b-2 border-solid border-primary-500 w-full">
      {/* Background Image */}
      <div className="absolute size-full">
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.9)0%,rgba(0,0,0,.8)50%)] size-full absolute opacity-60" />
        {/** biome-ignore lint/performance/noImgElement: Don't want to use next/image for this case */}
        <img
          id="header-image"
          src={img}
          alt=""
          className={cn("size-full object-cover", classNames?.image)}
        />
      </div>

      {/* Content */}
      <div className="absolute flex size-full flex-col">
        <div
          className={cn(
            centered
              ? "w-full max-w-6xl mx-auto flex items-center justify-center px-4 md:px-8 mt-8 md:mt-20 lg:mt-28"
              : "w-full max-w-500 md:max-w-175 lg:max-w-250 md:ml-16 lg:ml-40 2xl:mx-auto 2xl:max-w-350 mt-8 md:mt-20 lg:mt-28 px-8 md:px-0",
            classNames?.content,
          )}
        >
          {children}
        </div>
        <button
          type="button"
          className="sm:hidden mx-auto flex cursor-pointer flex-col items-center border-none bg-transparent p-0 text-lg font-medium outline-none text-primary mt-auto"
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
        <div id="scrollhere" className="mb-2"></div>
      </div>
    </div>
  );
}
