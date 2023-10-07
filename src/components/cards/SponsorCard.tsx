import {
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

import { ActionIcon } from "../inputs/ActionIcon";
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
  let accent: MantineColor = "blue";

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
      className="flex w-80 flex-col sponsor-card !px-0 !py-2 h-fit"
      shadow="lg"
    >
      <Card.Section
        inheritPadding
        className={clsx(
          "sponsor-card-image-container",
          "my-auto flex h-48 flex-col items-center py-4",
        )}
      >
        {logo !== undefined ? (
          <>
            {darkLogo !== undefined ? (
              <IdealImage
                img={darkLogo}
                alt={name + " logo"}
                className={clsx(
                  "sponsor-card-image",
                  "dark:flex hidden justify-center",
                )}
              />
            ) : null}
            <IdealImage
              img={logo}
              alt={name + " logo"}
              className={clsx(
                "sponsor-card-image",
                darkLogo !== undefined ? "dark:hidden" : null,
              )}
            />
          </>
        ) : (
          <span className="text-4xl font-semibold my-auto">{name}</span>
        )}

        {sub ? (
          <Text size="md" className="text-gray-500 dark:text-white">
            {sub}
          </Text>
        ) : null}
      </Card.Section>

      <div
        className={clsx(
          "flex border-0 border-solid px-2 pb-2",
          description || url ? "border-b" : null,
        )}
      >
        <div className="flex-grow font-bold">{name}</div>
        {level ? (
          <Badge className="my-auto" variant="filled" color={accent}>
            {level}
          </Badge>
        ) : null}
      </div>

      <div className="px-2 pt-1">
        {description ? <p className="mb-0">{description}</p> : null}
      </div>

      <div className="my-auto flex flex-none px-2 mt-2">
        <div className="flex-grow">
          {supportSince ? (
            <Text size="sm" fs="italic">
              Partnering with us since {supportSince}
            </Text>
          ) : null}
        </div>

        {url ? <ActionIcon to={url} icon={IconExternalLink} /> : null}
      </div>
    </Card>
  );
}
