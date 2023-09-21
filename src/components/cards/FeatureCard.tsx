import Link from "@docusaurus/Link";
import {
  Badge,
  Button,
  Card,
  Divider,
  MantineColor,
  Text,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TablerIconsProps } from "@tabler/icons-react";
import Heading from "@theme/Heading";
import IdealImage from "@theme/IdealImage";
import { FC, useEffect, useState } from "react";

export interface FeatureCardProps {
  Icon: FC<TablerIconsProps>;
  key: string;
  title: string | JSX.Element;
  body: string | JSX.Element;
  color?: MantineColor;
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
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`, true, {
    getInitialValueInEffect: false,
  });
  const [highlightColor, setHighlightColor] = useState<MantineColor>(color);

  useEffect(() => {
    if (!color)
      setHighlightColor(colorScheme === "dark" ? "brand-yellow" : "brand-blue");
  }, [colorScheme]);

  return (
    <Card
      shadow="lg"
      radioGroup="md"
      radius="lg"
      withBorder
      className="flex flex-col space-y-3 h-full mx-auto"
    >
      <div className="flex items-center space-x-2">
        <ThemeIcon
          color={highlightColor}
          className="border-none"
          variant="outline"
          size={mobile ? "lg" : "xl"}
        >
          <Icon size={50} stroke={1.5} />
        </ThemeIcon>
        <Heading
          as="h4"
          className="font-bold text-lg xl:text-xl font-sans m-auto"
        >
          {title}
        </Heading>
      </div>

      {img && (!img.placement || img.placement === "top") ? (
        <Image src={img.src} alt={img.alt} />
      ) : null}

      <div className="flex items-center">
        <Divider size="sm" color={highlightColor} className="flex-grow" />
        {badge ? (
          <Badge className="ml-2" color={color} size="lg" variant="light">
            {badge}
          </Badge>
        ) : null}
      </div>

      <div className="flex-grow flex flex-col">
        <Text
          size="md"
          c={colorScheme === "dark" ? "dimmed" : undefined}
          className="!mb-3"
        >
          {body}
        </Text>

        {img && img.placement === "bottom" ? (
          <div className="mt-auto">
            <Image src={img.src} alt={img.alt} />
          </div>
        ) : null}
      </div>

      {link ? (
        <Link to={link} className="ml-auto">
          <Button color={highlightColor} variant="subtle" size="compact-sm">
            {linkText ? linkText : "Learn More"}
          </Button>
        </Link>
      ) : null}
    </Card>
  );
}
