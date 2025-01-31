"use client";

import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface Props {
  img: string;
  children: ReactNode;
}

export default function HeroHeader({ img, children }: Props): ReactNode {
  return (
    <div className="sm:h-[500px] relative h-[calc(101vh-4rem)] border-0 border-b-2 border-solid border-primary-500 w-full">
      {/* Background Image */}
      <div className="absolute size-full">
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.9)0%,rgba(0,0,0,.8)50%)] size-full absolute opacity-60" />
        <img
          id="header-image"
          src={img}
          alt=""
          className="size-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute flex size-full flex-col">
        <div className="w-full max-w-500 md:max-w-[700px] lg:max-w-[1000px] md:ml-16 lg:ml-40 2xl:mx-auto 2xl:max-w-[1400px] mt-8 md:mt-20 lg:mt-28 px-8 md:px-0">
          {children}
        </div>
        <button
          className="sm:hidden mx-auto mb-10 flex cursor-pointer flex-col items-center border-none bg-transparent p-0 text-lg font-medium outline-none text-primary mt-auto"
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
