"use client";

import AutoHeight from "embla-carousel-auto-height";
import type useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";

import * as SUICarousel from "@/components/shadcn/ui/carousel";

type Props = {
  slides: ReactNode[];
  noLoop?: boolean;
  autoHeight?: boolean;
  startIndex?: number;
  reverse?: boolean;
};

export function ManualCarousel({
  slides,
  noLoop,
  autoHeight,
  startIndex = 0,
  reverse,
}: Props): JSX.Element {
  const plugins: Parameters<typeof useEmblaCarousel>[1] = [];

  if (autoHeight) {
    plugins.push(AutoHeight());
  }

  if (reverse) {
    startIndex = slides.length;
  }

  return (
    <SUICarousel.Carousel
      opts={{
        loop: !noLoop,
        startIndex: startIndex,
      }}
      plugins={plugins}
    >
      <SUICarousel.CarouselContent>
        {slides.map((slide, i) => (
          <SUICarousel.CarouselItem key={i}>{slide}</SUICarousel.CarouselItem>
        ))}
      </SUICarousel.CarouselContent>
    </SUICarousel.Carousel>
  );
}
