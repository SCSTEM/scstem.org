import {
  ActionIcon,
  Badge,
  Card,
  Text,
  MantineColor,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { clsx } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import React from "react";

import { Sponsor, SponsorLevel } from "@site/data";

export default function SponsorCard({
  name,
  level,
  logo,
  darkLogo,
  url,
  description,
  sub,
  supportSince,
}: Sponsor) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  let accent: MantineColor = "brand-blue";

  switch (level) {
    case SponsorLevel.Supporter:
      // Do nothing
      break;
    case SponsorLevel.Bronze:
      accent = theme.colors.orange[6];
      break;
    case SponsorLevel.Silver:
      accent = theme.colors.gray[6];
      break;
    case SponsorLevel.Gold:
      accent = theme.colors.yellow[6];
      break;
    case SponsorLevel.Platinum:
      accent = theme.colors.violet[6];
      break;
    case SponsorLevel.Ultimate:
      accent = theme.colors.red[6];
      break;
  }

  return (
    <Card withBorder radius="md" className="flex w-80 flex-col" shadow="lg">
      <Card.Section className="my-auto flex h-48 flex-col items-center space-y-1 p-6">
        {logo ? (
          <img
            src={darkLogo && colorScheme === "dark" ? darkLogo : logo}
            alt={name + " logo"}
            className="w-full my-auto object-contain h-40"
          />
        ) : (
          <span className="text-4xl font-semibold my-auto">{name}</span>
        )}

        {sub ? (
          <Text size="sm" className="text-gray dark:text-white">
            {sub}
          </Text>
        ) : null}
      </Card.Section>

      <Card.Section
        className={clsx(
          "flex border-0 border-solid px-2 py-2",
          description || url ? "border-b" : null
        )}
      >
        <Text weight={700} className="flex-grow">
          {name}
        </Text>
        {level ? (
          <Badge
            className="my-auto"
            variant="filled"
            sx={{ borderColor: accent, backgroundColor: accent }}
          >
            {level}
          </Badge>
        ) : null}
      </Card.Section>

      <Card.Section className="flex-grow px-2 pt-1">
        {description ? <Text>{description}</Text> : null}
      </Card.Section>

      <Card.Section className="my-auto flex flex-none px-2 py-2">
        <div className="flex-grow">
          {supportSince ? (
            <Text size="sm" fs="italic">
              Partnering with us since {supportSince}
            </Text>
          ) : null}
        </div>

        {url ? (
          <ActionIcon
            variant="outline"
            component="a"
            href={url}
            target="_blank"
          >
            <IconExternalLink size={18} stroke={1.5} />
          </ActionIcon>
        ) : null}
      </Card.Section>
    </Card>
  );
}
