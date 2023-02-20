import Link from "@docusaurus/Link";
import {
  Badge,
  Card,
  Divider,
  MantineColor,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

export interface FeatureCardProps {
  Icon: React.FC<TablerIconsProps>;
  title: string;
  description: string;
  color?: MantineColor;
  link?: string;
  badge?: string;
}

export default function FeatureCard({
  Icon,
  title,
  description,
  color,
  link,
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
      className="flex flex-col space-y-3 h-full lg:w-[450px] mx-auto"
    >
      <ThemeIcon
        color={highlightColor}
        className="w-12 h-12 border-none"
        variant="outline"
        // border-none + variant="outline" is a hack to allow us to change the color of icon
      >
        <Icon size={50} stroke={1.5} />
      </ThemeIcon>

      <Text size="lg" weight={700}>
        {title}
      </Text>

      <div className="flex items-center">
        <Divider size="sm" color={highlightColor} className="flex-grow" />
        {badge ? (
          <Badge className="ml-2" color={color} size="lg">
            {badge}
          </Badge>
        ) : null}
      </div>

      <Text size="md" color="dimmed" className="flex-grow">
        {description}
      </Text>

      {link ? (
        <div>
          <Text component={Link} to={link} color={color}>
            Learn more
          </Text>
        </div>
      ) : null}
    </Card>
  );
}
