import {
  ActionIcon,
  Badge,
  Card,
  Text,
  MantineColor,
  useMantineTheme,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import IdealImage from "@theme/IdealImage";
import { clsx } from "clsx";

import { Sponsor, SponsorLevel } from "@site/data";

import "./SponsorCard.css";

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
  const { colors } = useMantineTheme();
  let accent: MantineColor = "brand-blue";

  switch (level) {
    case SponsorLevel.Supporter:
      // Do nothing
      break;
    case SponsorLevel.Bronze:
      accent = colors.orange[6];
      break;
    case SponsorLevel.Silver:
      accent = colors.gray[6];
      break;
    case SponsorLevel.Gold:
      accent = colors.yellow[6];
      break;
    case SponsorLevel.Platinum:
      accent = colors.violet[6];
      break;
    case SponsorLevel.Ultimate:
      accent = colors.red[6];
      break;
  }

  return (
    <Card
      withBorder
      radius="md"
      className="flex w-80 flex-col sponsor-card"
      shadow="lg"
    >
      <Card.Section className="my-auto flex h-48 flex-col items-center space-y-1 px-6 py-4">
        {logo !== undefined ? (
          <>
            {darkLogo !== undefined ? (
              <IdealImage
                img={darkLogo}
                alt={name + " logo"}
                className="h-full object-contain dark:block hidden"
              />
            ) : null}
            <IdealImage
              img={logo}
              alt={name + " logo"}
              className={clsx(
                "h-full object-contain",
                darkLogo !== undefined ? "dark:hidden" : null,
              )}
            />
          </>
        ) : (
          <span className="text-4xl font-semibold my-auto">{name}</span>
        )}

        {sub ? (
          <Text size="md" className="text-gray dark:text-white">
            {sub}
          </Text>
        ) : null}
      </Card.Section>

      <Card.Section
        className={clsx(
          "flex border-0 border-solid px-2 py-2",
          description || url ? "border-b" : null,
        )}
      >
        <Text className="flex-grow font-bold">{name}</Text>
        {level ? (
          <Badge className="my-auto" variant="filled" color={accent}>
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
