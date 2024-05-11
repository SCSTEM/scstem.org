import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ColorScale } from "@/styles/theme";
import { parseColor } from "@/styles/theme";

type PatternType = "circuit" | "topography" | "hexagons";

type Props = {
  pattern: PatternType;
  classNames?: {
    container?: string;
    background?: string;
  };
  color?: ColorScale;
  children?: ReactNode;
};

export function PatternBackground({
  color,
  pattern,
  classNames,
  children,
}: Props): JSX.Element {
  const parsedColor = parseColor(color);

  let url: string;
  switch (pattern) {
    case "circuit":
      url = "/image/pattern/circuit.svg";
      break;
    case "topography":
      url = "/image/pattern/topography.svg";
      break;
    case "hexagons":
      url = "/image/pattern/hexagons.svg";
      break;
  }

  return (
    <div className={cn("relative", classNames?.container)}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(
          to right, 
          hsla(var(--nextui-primary) / 15%) 0%, 
          hsla(var(--nextui-primary) / 5%) 15%, 
          hsla(var(--nextui-primary) / 0%) 30%, 
          hsla(var(--nextui-primary) / 0%) 70%, 
          hsla(var(--nextui-primary) / 5%) 85%, 
          hsla(var(--nextui-primary) / 15%) 100%
        )`,
        }}
      ></div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: `${parsedColor}`,
          maskImage: `url(${url})`,
          WebkitMaskImage: `url(${url})`,
        }}
      ></div>
      <div className="grow">{children}</div>
      <div
        className={cn(
          "absolute inset-0 bg-black -z-20",
          classNames?.background,
        )}
      ></div>
    </div>
  );
}
