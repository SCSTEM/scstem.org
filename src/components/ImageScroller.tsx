import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface Props {
  className?: string;
  images: string[] | JSX.Element[];
  delay?: number;
}

// TODO: Fix
// const useStyles = createStyles(() => ({
//   controls: {
//     ref: getStylesRef("controls"),
//     transition: "opacity 150ms ease",
//     opacity: 0,
//   },
//   root: {
//     "&:hover": {
//       [`& .${getStylesRef("controls")}`]: {
//         opacity: 1,
//       },
//     },
//   },
// }));

export default function Scroller({ className, images, delay }: Props) {
  const autoplay = useRef(Autoplay({ delay: delay ?? 4000 }));
  // TODO: Fix
  // const { classes } = useStyles();

  return (
    <Carousel
      loop
      draggable={false}
      plugins={[autoplay.current]}
      //classNames={classes}
      className={className}
    >
      {images.map((image: string | JSX.Element, i: number) => (
        <Carousel.Slide key={i}>
          {typeof image === "string" ? (
            <img src={image} className="object-contain" />
          ) : (
            image
          )}
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
