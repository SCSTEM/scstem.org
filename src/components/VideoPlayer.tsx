"use client";

import { IconPlayerPlay } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState, type JSX } from "react";

import { cn } from "@/lib/utils";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Props = {
  url: string;
  placeholder?: string | ReactNode;
  classNames?: {
    wrapper?: string;
    player?: string;
    icon?: string;
    header?: string;
  };
};

export function VideoPlayer({
  url,
  classNames,
  placeholder,
}: Props): ReactNode {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <div
      className={cn(
        "aspect-video border-primary border-8 border-solid w-11/12 mx-auto xl:max-w-6xl rounded-xl bg-background",
        classNames?.wrapper,
      )}
    >
      <div
        className={cn(
          "relative md:absolute bg-primary mx-auto w-full md:w-fit inset-x-0 text-center text-black pb-2 md:pb-1 text-md md:text-2xl md:rounded-b-lg md:px-2 font-semibold transition-opacity duration-200",
          videoReady ? "opacity-0" : "opacity-100",
          classNames?.header,
        )}
      >
        Meet our highschool team, learn about{" "}
        <span className="italic">FIRST®</span>
      </div>

      <ReactPlayer
        className={cn(classNames?.player)}
        url={url}
        controls
        light={placeholder}
        volume={0.4}
        width="100%"
        height="100%"
        playIcon={
          <IconPlayerPlay
            className={cn("text-primary md:size-24 size-16", classNames?.icon)}
          />
        }
        onReady={() => setVideoReady(true)}
      />
    </div>
  );
}
