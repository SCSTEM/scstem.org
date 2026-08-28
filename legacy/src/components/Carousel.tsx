"use client";

import AutoHeight from "embla-carousel-auto-height";
import Autoplay from "embla-carousel-autoplay";
import type useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";

import * as SUICarousel from "@/components/shadcn/ui/carousel";

type Props = {
  slides: ReactNode[];
  noAuto?: boolean;
  noLoop?: boolean;
  delay?: number;
  resize?: boolean;
};

export function Carousel({
  slides,
  noLoop,
  noAuto,
  delay = 3000,
  resize,
}: Props): ReactNode {
  const plugins: Parameters<typeof useEmblaCarousel>[1] = [];

  if (!noAuto) {
    plugins.push(
      Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true }),
    );
  }

  if (resize) {
    plugins.push(AutoHeight());
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
