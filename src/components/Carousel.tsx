"use client";

import Autoplay from "embla-carousel-autoplay";
import type useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";

import * as SUICarousel from "@/components/shadcn/ui/carousel";

type Props = {
  slides: ReactNode[];
  noAuto?: boolean;
  noLoop?: boolean;
  delay?: number;
};

export function Carousel({
  slides,
  noLoop,
  noAuto,
  delay = 3000,
}: Props): JSX.Element {
  const plugins: Parameters<typeof useEmblaCarousel>[1] = [];

  if (!noAuto) {
    plugins.push(
      Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true }),
    );
  }

  return (
    <SUICarousel.Carousel
      opts={{
        loop: !noLoop,
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
