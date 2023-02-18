import Link from "@docusaurus/Link";
import {
  Card,
  Divider,
  MantineColor,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import React, { useEffect } from "react";

export interface FCProps {
  Icon: React.FC<TablerIconsProps>;
  title: string;
  description: string;
  color?: MantineColor;
  link?: string;
}

export default function FeatureCard({
  Icon,
  title,
  description,
  color,
  link,
}: FCProps): JSX.Element {
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (!color) color = colorScheme === "dark" ? "brand-yellow" : "brand-blue";
  }, [colorScheme]);

  return (
    <Card
      shadow="lg"
      radioGroup="md"
      p="xl"
      radius="lg"
      withBorder
      className="flex flex-col space-y-4"
    >
      <ThemeIcon color={color} className="w-12 h-12">
        <Icon size={50} stroke={2} />
      </ThemeIcon>
      <Text size="lg" weight={700}>
        {title}
      </Text>
      <Divider size="sm" color={color} className="w-28" />
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
