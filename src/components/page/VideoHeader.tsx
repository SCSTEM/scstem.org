"use client";

import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  src: {
    webm: string;
    mp4: string;
    image: string;
  };
  scrollButtonText?: string;
  className?: string;
};

export function VideoHeader({
  children,
  src,
  scrollButtonText,
  className,
}: Props): JSX.Element {
  return (
    <header
      className={cn(
        "relative h-[calc(101vh-4rem)] w-full text-white shadow-2xl flex flex-col",
        className,
      )}
    >
      <div className="absolute size-full -z-10">
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.9)0%,rgba(0,0,0,.8)50%)] size-full absolute dark:opacity-1 opacity-60" />
        <video
          className="object-cover size-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src.webm} type="video/webm" />
          <source src={src.mp4} type="video/mp4" />
          <img src={src.image} alt="" />
        </video>
      </div>
      <div className="size-full">{children}</div>
      <button
        className="mx-auto flex cursor-pointer flex-col items-center border-none bg-transparent sm:text-2xl font-bold outline-none text-primary mt-auto mb-10"
        onClick={() =>
          document
            .getElementById("scrollhere")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        {scrollButtonText || "Find out more"}
        <IconChevronDown
          size={50}
          stroke={1.5}
          className="animate-bounce mt-1"
        />
      </button>

      <div id="scrollhere" className="mb-10"></div>
    </header>
  );
}
