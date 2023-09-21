import Link from "@docusaurus/Link";
import { Carousel } from "@mantine/carousel";
import {
  useMantineColorScheme,
  Text,
  ActionIcon,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  TablerIconsProps,
} from "@tabler/icons-react";
import IdealImage from "@theme/IdealImage";
import Autoplay from "embla-carousel-autoplay";
import { FC, useRef } from "react";

import { SponsorLevel, Sponsors } from "@site/data";
import { ColorToggle } from "@site/src/components/inputs/ColorToggle";

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterLink =
  | {
      title: string;
      to: string;
      type?: "link";
    }
  | {
      element: (key: string | number) => JSX.Element;
      type?: "element";
    };

type FooterButton = {
  href: string;
  icon: FC<TablerIconsProps>;
};

const footerSections: FooterSection[] = [
  {
    title: "Support Us",
    links: [
      { title: "Donate", to: "/wiki/donations" },
      { title: "Sponsors", to: "/sponsors" },
    ],
  },
  {
    title: "Find us online",
    links: [
      { title: "Facebook", to: "https://go.scstem.tech/facebook" },
      { title: "LinkedIn", to: "https://go.scstem.tech/linkedin" },
      { title: "GitHub", to: "https://go.scstem.tech/github" },
    ],
  },
  {
    title: "Member area",
    links: [
      {
        element: (key) => (
          <a key={key} className="text-gray" href="/team">
            Team Login
          </a>
        ),
      },
      { title: "Slack", to: "https://go.scstem.tech/slack" },
      { title: "Gmail", to: "http://mail.scstem.org" },
      { title: "Google Drive", to: "http://drive.scstem.org" },
    ],
  },
];

const footerButtons: FooterButton[] = [
  {
    href: "mailto:info@scstem.org",
    icon: IconMail,
  },
  {
    href: "https://go.scstem.tech/facebook",
    icon: IconBrandFacebook,
  },
  {
    href: "https://go.scstem.tech/linkedin",
    icon: IconBrandLinkedin,
  },
  {
    href: "https://go.scstem.tech/github",
    icon: IconBrandGithub,
  },
];

function Sponsor({ sponsor }) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Link to={sponsor.url} className="hover:no-underline">
      <div className="flex flex-col items-center justify-center space-y-1 h-full">
        {sponsor.logo ? (
          <IdealImage
            img={
              sponsor.darkLogo && colorScheme === "dark"
                ? sponsor.darkLogo
                : sponsor.logo
            }
            alt={sponsor.name + " logo"}
            className="w-52 my-auto object-contain"
          />
        ) : (
          <span className="text-4xl font-semibold my-auto text-gray">
            {sponsor.name}
          </span>
        )}

        {sponsor.sub ? (
          <Text size="sm" className="text-gray dark:text-white">
            {sponsor.sub}
          </Text>
        ) : null}
      </div>
    </Link>
  );
}

type Props = {
  copyright: string;
};

export default function Footer({ copyright }: Props): JSX.Element {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const sponsors = Sponsors.filter(
    (sponsor) =>
      sponsor.level === SponsorLevel.Ultimate ||
      sponsor.level === SponsorLevel.Platinum,
  );

  return (
    <footer className="border-slate-400 bg-zinc-200 py-12 shadow-inner dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Sponsors */}
        <div>
          <Text
            size="lg"
            className="mx-auto mb-4 w-5/6 text-center dark:text-zinc-400 md:w-full font-bold"
          >
            Special thanks to our Ultimate and Platinum sponsors for powering
            our mission
          </Text>

          <Carousel
            plugins={sponsors.length > 1 ? [autoplay.current] : []}
            loop
            draggable={false}
            withControls={sponsors.length > 1}
            slideSize="33.333333%"
            // TODO: Fix
            // breakpoints={[
            //   { minWidth: "lg", slideSize: "33.3333%" },
            //   { minWidth: "md", slideSize: "50%" },
            //   { maxWidth: "md", slideSize: "100%", slideGap: 0 },
            // ]}
          >
            {sponsors.map((sponsor, i) => (
              <Carousel.Slide key={i}>
                <Sponsor sponsor={sponsor} />
              </Carousel.Slide>
            ))}
          </Carousel>
          <div className="flex w-full flex-col items-center justify-evenly space-y-8 space-x-6 py-2 align-middle md:flex-row md:space-y-0"></div>
        </div>

        {/* Main Footer */}
        <div className="flex md:flex-row flex-col min-h-[160px] justify-between border-0 border-y border-solid border-slate-400 py-6 leading-9">
          <div className="mx-auto w-80 items-center leading-3 md:ml-0 md:max-w-[240px] md:items-start mb-8 md:mb-0">
            <img
              src="/img/svg/logo-color-full.svg"
              alt="South Central STEM Collective logo"
              width="240px"
              height="80px"
              className="w-full"
            />
            <Text c="dimmed" size="sm" className="text-center">
              SC2 is 501(c)(3) non-profit focused on providing STEM
              opportunities for students in and around Franklin County PA.
            </Text>
          </div>

          {/* Links */}
          <div className="justify-between md:flex grid grid-cols-2 gap-6 mx-auto md:mx-0">
            {footerSections.map((section, i) => (
              <div
                key={i}
                className="flex md:w-40 flex-col items-center md:items-start"
              >
                <Text size="lg" className="dark:text-zinc-400 font-bold">
                  {section.title}
                </Text>
                {section.links.map((link, i) =>
                  link.type === "element" ? (
                    link.element(i)
                  ) : (
                    <Link key={i} to={link.to} className="text-gray">
                      {link.title}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto flex w-80 flex-col items-center justify-between md:w-full md:flex-row">
          <div className="text-center md:text-left dark:opacity-25 opacity-50 text-sm dark:text-white text-black">
            {copyright}
          </div>
          <div className="flex justify-end">
            {footerButtons.map((button, i) => (
              // TODO: Redo ActionIcon styles
              <ActionIcon
                key={i}
                component="a"
                href={button.href}
                size="lg"
                opacity={50}
                target="_blank"
              >
                <button.icon size={20} stroke={1.5} />
              </ActionIcon>
            ))}
            <ColorToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
