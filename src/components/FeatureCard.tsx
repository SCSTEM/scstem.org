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
} from "@mantine/core";
import { IconExternalLink, TablerIconsProps } from "@tabler/icons-react";
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
    src: any;
    alt: string;
    placement?: "top" | "bottom";
  };
}

const Image = ({ src, alt }: { src: any; alt: string }) => (
  <IdealImage
    img={src}
    alt={alt}
    className="h-48 w-full rounded-xl shadow-lg object-cover overflow-hidden"
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
  const { colorScheme } = useMantineColorScheme();
  const [highlightColor, setHighlightColor] = useState<MantineColor>(color);

  useEffect(() => {
    if (!color)
      setHighlightColor(colorScheme === "dark" ? "brand-yellow" : "brand-blue");
  }, [colorScheme]);

  return (
    <Card
      shadow="lg"
      radioGroup="md"
      p="xl"
      radius="lg"
      withBorder
      className="flex flex-col space-y-3 h-full mx-auto"
    >
      <ThemeIcon
        color={highlightColor}
        className="w-12 h-12 border-none"
        variant="outline"
        // border-none + variant="outline" is a hack to allow us to change the color of icon
      >
        <Icon size={50} stroke={1.5} />
      </ThemeIcon>

      {typeof title === "string" ? (
        <Text size="lg" weight={700}>
          {title}
        </Text>
      ) : (
        title
      )}

      {img && (!img.placement || img.placement === "top") ? (
        <Image src={img.src} alt={img.alt} />
      ) : null}

      <div className="flex items-center">
        <Divider size="sm" color={highlightColor} className="flex-grow" />
        {badge ? (
          <Badge className="ml-2" color={color} size="lg">
            {badge}
          </Badge>
        ) : null}
      </div>

      <div className="flex-grow flex flex-col">
        <Text
          size="md"
          color={colorScheme === "dark" ? "dimmed" : null}
          className="mb-3"
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
          <Button
            rightIcon={<IconExternalLink />}
            color={highlightColor}
            variant="subtle"
            compact
          >
            {linkText ? linkText : "Learn More"}
          </Button>
        </Link>
      ) : null}
    </Card>
  );
}
