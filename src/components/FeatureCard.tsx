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
import React, { useEffect, useState } from "react";

export interface FeatureCardProps {
  Icon: React.FC<TablerIconsProps>;
  title: string | JSX.Element;
  body: string | JSX.Element;
  color?: MantineColor;
  link?: string;
  linkText?: string;
  badge?: string;
}

export default function FeatureCard({
  Icon,
  title,
  body,
  color,
  link,
  linkText,
  badge,
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

      <div className="flex items-center">
        <Divider size="sm" color={highlightColor} className="flex-grow" />
        {badge ? (
          <Badge className="ml-2" color={color} size="lg">
            {badge}
          </Badge>
        ) : null}
      </div>

      <Text
        size="md"
        color={colorScheme === "dark" ? "dimmed" : null}
        className="flex-grow"
      >
        {body}
      </Text>

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
