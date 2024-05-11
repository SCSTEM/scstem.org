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
    <Card className="flex flex-col max-w-[350px] sm:w-[400px] mx-auto size-full">
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
          "flex border-0 border-solid pb-2 px-2",
          url || supportSince ? "border-b" : null,
        )}
      >
        <div className="grow font-bold">{name}</div>
        {level ? (
          <Chip variant="flat" style={{ backgroundColor: `${parsedColor}50` }}>
            {level}
          </Chip>
        ) : null}
      </div>

      <div className="flex mx-2 h-8 mb-1 mt-1.5 items-center">
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
    </Card>
  );
}
