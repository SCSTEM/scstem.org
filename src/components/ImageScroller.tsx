import { Carousel } from "@mantine/carousel";
import { createStyles, Image, getStylesRef } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface Props {
  className?: string;
  images: string[];
  delay?: number;
  minHeight?: number;
}

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getStylesRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

export default function Scroller({
  className,
  images,
  delay,
  minHeight,
}: Props) {
  const autoplay = useRef(Autoplay({ delay: delay ?? 4000 }));
  const { classes } = useStyles();

  return (
    <Carousel
      loop
      draggable={false}
      plugins={[autoplay.current]}
      classNames={classes}
      mx="auto"
      className={className}
    >
      {images.map((image) => (
        <Carousel.Slide key={image}>
          <Image src={image} radius="lg" height={minHeight} withPlaceholder />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
