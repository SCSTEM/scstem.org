import Link from "@docusaurus/Link";
import { Burger, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChartLine,
} from "@tabler/icons-react";
import React, { useState } from "react";

const links = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
];

export default function Navbar(): JSX.Element {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={`/biohazard${link.link}`}
      className="rounded-sm pt-2 pr-3 text-sm font-medium"
    >
      {link.label}
    </Link>
  ));

  return (
    <div className="flex h-[60px] items-center justify-between bg-[var(--ifm-navbar-background-color)]">
      <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        className="mr-2 md:hidden"
      />
      <Group spacing={5} className="hidden w-64 md:block">
        {items}
      </Group>

      <img src="/svg/logo-color-full.svg" className="h-14" />

      <Group spacing={0} className="md: ml-auto w-auto md:ml-0 md:w-64">
        <ActionIcon
          component="a"
          href="https://go.scstem.tech/biofacebook"
          size="lg"
        >
          <IconBrandFacebook size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href="https://go.scstem.tech/bioinsta"
          size="lg"
        >
          <IconBrandInstagram size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href="https://go.scstem.tech/biotba"
          size="lg"
        >
          <IconChartLine size={18} stroke={1.5} />
        </ActionIcon>
      </Group>
    </div>
  );
}
