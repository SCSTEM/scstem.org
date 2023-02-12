import React from "react";
import { ActionIcon, Badge, Card, Text } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import clsx from "clsx";
import { Sponsor } from "@site/data";
import Image from "@site/src/components/Image";

export default function SponsorCard({
  name,
  level,
  logo,
  url,
  description,
  sub,
  supportSince,
}: Sponsor) {
  return (
    <Card withBorder radius="md" className="flex w-80 flex-col" shadow="lg">
      <Card.Section className="my-auto flex h-48 flex-col items-center space-y-1 p-6">
        <Image
          src={logo ? logo : null}
          alt={name + " logo"}
          height={logo ? null : 125}
          placeholder={
            logo ? null : <span className="text-4xl font-semibold">{name}</span>
          }
          className="my-auto"
        />
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
        {level ? <Badge className="my-auto">{level}</Badge> : null}
      </Card.Section>

      <Card.Section className="flex-grow py-1 px-2">
        {description ? <Text>{description}</Text> : null}
      </Card.Section>

      <Card.Section className="flex flex-none px-2 py-2">
        <Text size="sm" fs="italic" className="my-auto flex-grow">
          Partnering with us since {supportSince}
        </Text>
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
