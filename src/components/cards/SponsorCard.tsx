import { Card, Chip, commonColors } from "@nextui-org/react";
import { IconExternalLink } from "@tabler/icons-react";
import IdealImage from "@theme/IdealImage";
import { clsx } from "clsx";

import { Sponsor, SponsorLevel } from "@site/data";
import useParseColor from "@site/src/hooks/useParseColor";
import { ColorScale, colorScales } from "@site/src/styles/theme";

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
  let accent: ColorScale = colorScales.blue;

  switch (level) {
    case SponsorLevel.Supporter:
      break;
    case SponsorLevel.Bronze:
      accent = colorScales.orange;
      break;
    case SponsorLevel.Silver:
      accent = colorScales.gray;
      break;
    case SponsorLevel.Gold:
      accent = colorScales.yellow;
      break;
    case SponsorLevel.Platinum:
      accent = commonColors.purple;
      break;
    case SponsorLevel.Ultimate:
      accent = colorScales.red;
      break;
  }

  return (
    <Card className="sponsor-card flex flex-col">
      <div
        className={clsx(
          "sponsor-card-image-container",
          "my-auto flex h-48 flex-col items-center p-4",
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
          <div className="text-gray-500 dark:text-white text-md">{sub}</div>
        ) : null}
      </div>

      <div
        className={clsx(
          "flex border-0 border-solid px-2 pb-2",
          description || url ? "border-b" : null,
        )}
      >
        <div className="flex-grow font-bold">{name}</div>
        {level ? <LevelChip color={accent} label={level} /> : null}
      </div>

      <div className="px-2 flex flex-col space-y-2 mt-2 mx-1">
        {description ? <p className="text-sm">{description}</p> : null}

        <div className="flex flex-none opacity-70 h-8 items-center mb-1">
          <div className="flex-grow">
            {supportSince ? (
              <div className="text-sm italic">
                Partnering with us since {supportSince}
              </div>
            ) : null}
          </div>

          <div className="">
            {url ? <ActionIcon href={url} icon={IconExternalLink} /> : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

function LevelChip({
  color,
  label,
}: {
  color?: ColorScale;
  label: string;
}): JSX.Element {
  const parsedColor = useParseColor(color);
  return (
    <Chip
      variant="flat"
      style={{ backgroundColor: `${parsedColor}60` }}
      className="text-opacity-85"
    >
      {label}
    </Chip>
  );
}
