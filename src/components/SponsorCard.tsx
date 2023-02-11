import React from "react";
import { Badge, Card } from "@mantine/core";
import Image from "@theme/IdealImage";

enum Level {
  Supporter = "STEM Supporter",
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
  Ultimate = "Ultimate",
}

interface Props {
  name: string;
  level?: Level;
  logoPath?: string;
  url?: string;
  description?: string;
}

export default function SponsorCard({
  name,
  level,
  logoPath,
  url,
  description,
}: Props) {
  return (
    <Card withBorder p="lg" radius="md">
      <Card.Section mb="sm">
        <Image img={require(logoPath)} />
      </Card.Section>

      <Card.Section className="mt-2 border-t border-solid">
        <Badge>{level}</Badge>
      </Card.Section>
    </Card>
  );
}
