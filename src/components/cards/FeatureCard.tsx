import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { TablerIconsProps } from "@tabler/icons-react";
import Heading from "@theme/Heading";
import IdealImage from "@theme/IdealImage";
import { FC, useEffect, useState } from "react";

import { ColorScale, colorScales } from "@site/src/styles/theme";

export interface FeatureCardProps {
  Icon: FC<TablerIconsProps>;
  key: string;
  title: string | JSX.Element;
  body: string | JSX.Element;
  color?: ColorScale;
  link?: string;
  linkText?: string;
  badge?: string;
  img?: {
    src: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    alt: string;
    placement?: "top" | "bottom";
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Image = ({ src, alt }: { src: any; alt: string }) => (
  <IdealImage
    img={src}
    alt={alt}
    className="h-44 lg:h-52 w-full rounded-xl shadow-lg object-cover overflow-hidden zoomable"
  />
);

export default function FeatureCard({
  Icon,
  title,
  body,
  color,
  link,
  linkText,
  badge,
  img,
}: FeatureCardProps): JSX.Element {
  const { colorMode } = useColorMode();
  const [highlightColor, setHighlightColor] = useState<string>(color?.DEFAULT);

  useEffect(() => {
    if (!color)
      setHighlightColor(
        colorMode === "dark"
          ? colorScales.yellow.DEFAULT
          : colorScales.blue.DEFAULT,
      );
  }, [colorMode]);

  return (
    <Card
      classNames={{
        base: "h-full px-1",
        body: "pt-0",
      }}
    >
      <CardHeader>
        <Icon size={50} stroke={1.5} color={highlightColor} />
        <Heading
          as="h4"
          className="font-bold text-lg xl:text-xl font-sans ml-4"
        >
          {title}
        </Heading>
      </CardHeader>

      <CardBody className="flex flex-col space-y-4">
        {img && (!img.placement || img.placement === "top") ? (
          <Image src={img.src} alt={img.alt} />
        ) : null}
        <div className="flex items-center space-x-3">
          <div
            style={{ borderColor: highlightColor }}
            className="flex-grow border-b-1"
          />
          {badge ? (
            <Chip
              variant="flat"
              style={{ backgroundColor: `${highlightColor}20` }}
              className="text-opacity-85"
            >
              {badge}
            </Chip>
          ) : null}
        </div>
        <div className="flex-grow flex flex-col">
          <div className="mb-3 opacity-85">{body}</div>

          {img && img.placement === "bottom" ? (
            <div className="mt-auto">
              <Image src={img.src} alt={img.alt} />
            </div>
          ) : null}
        </div>
      </CardBody>

      {link ? (
        <CardFooter>
          <Link to={link} className="ml-auto">
            <Button
              variant="light"
              className="h-fit py-1 px-2"
              style={{
                color: highlightColor,
              }}
            >
              {linkText ? linkText : "Learn More"}
            </Button>
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
