import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { IconExternalLink } from "@tabler/icons-react";

import { ActionIcon } from "@/components/ActionIcon";
import { Image } from "@/components/Image";
import type { Sponsor } from "@/data/sponsors";
import { SponsorLevel } from "@/data/sponsors";
import { cn } from "@/lib/utils";
import type { ColorScale } from "@/styles/theme";
import { parseColor } from "@/styles/theme";

export default function SponsorCard({
  name,
  level,
  logo,
  url,
  description,
  sub,
  supportSince,
}: Sponsor) {
  let accent: ColorScale;
  switch (level) {
    case SponsorLevel.Friend:
      accent = "green";
      break;
    case SponsorLevel.Bronze:
      accent = "orange";
      break;
    case SponsorLevel.Silver:
      accent = "gray";
      break;
    case SponsorLevel.Gold:
      accent = "yellow";
      break;
    case SponsorLevel.Platinum:
      accent = "blue";
      break;
  }
  const parsedColor = parseColor(accent);

  return (
    <Card className="flex flex-col bg-content2">
      <div className="my-auto flex h-48 flex-col items-center p-4">
        {logo ? (
          <Image src={logo} alt={name + " logo"} className="size-full" />
        ) : (
          <span className="text-4xl font-semibold my-auto">{name}</span>
        )}
        {sub ? (
          <div className="text-gray-500 dark:text-white text-md">{sub}</div>
        ) : null}
      </div>

      <div
        className={cn(
          "flex border-0 border-solid mx-2 pb-2",
          description || url || supportSince ? "border-b" : null,
        )}
      >
        <div className="grow font-bold">{name}</div>
        {level ? (
          <Chip variant="flat" style={{ backgroundColor: `${parsedColor}50` }}>
            {level}
          </Chip>
        ) : null}
      </div>

      <div className="flex flex-col space-y-2 mx-2 my-1">
        {description ? <p className="text-sm">{description}</p> : null}

        <div className="flex flex-none h-8 items-center mb-1">
          <div className="grow">
            {supportSince ? (
              <div className="text-sm italic">
                Partnering with us since {supportSince}
              </div>
            ) : null}
          </div>

          {url ? (
            <ActionIcon href={url} icon={IconExternalLink} color="default" />
          ) : null}
        </div>
      </div>
    </Card>
  );
}
