import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

import { ActionIcon } from "@/components/ActionIcon";
import { Carousel } from "@/components/Carousel";
import { Image } from "@/components/Image";
import { LogoFullColor } from "@/components/Logo";
import { SponsorLevel, Sponsors } from "@/data/sponsors";
import type { Sponsor as SponsorSlide } from "@/data/sponsors";
import type { Icon } from "@/lib/utils";
import { cn } from "@/lib/utils";

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterLink = {
  title: string;
  href: string;
};

type FooterButton = {
  href: string;
  icon: Icon;
};

const footerSections: FooterSection[] = [
  {
    title: "Support Us",
    links: [
      { title: "Donate", href: "/wiki/donations" },
      { title: "Sponsors", href: "/sponsors" },
    ],
  },
  {
    title: "Find us online",
    links: [
      { title: "Facebook", href: "https://go.scstem.tech/facebook" },
      { title: "LinkedIn", href: "https://go.scstem.tech/linkedin" },
      { title: "GitHub", href: "https://go.scstem.tech/github" },
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

const footerSponsors = Sponsors.filter(
  (sponsor) =>
    sponsor.level === SponsorLevel.Silver ||
    sponsor.level === SponsorLevel.Gold ||
    sponsor.level === SponsorLevel.Platinum,
);

function SponsorSlide({ sponsor }: { sponsor: SponsorSlide }): JSX.Element {
  return (
    <Link href={sponsor.url} className="hover:no-underline size-full">
      <div className="flex flex-col items-center justify-center space-y-1 size-full">
        {sponsor.logo ? (
          <Image
            src={sponsor.logo}
            alt={sponsor.name + " logo"}
            className="size-full object-contain sponsor-image"
          />
        ) : (
          <span className="text-4xl font-semibold my-auto text-foreground">
            {sponsor.name}
          </span>
        )}

        {sponsor.sub ? (
          <div className="text-foreground text-sm">{sponsor.sub}</div>
        ) : null}
      </div>
    </Link>
  );
}

export function Footer({ className }: { className?: string }): JSX.Element {
  return (
    <footer
      className={cn("py-4 md:py-12 shadow-large bg-background/70", className)}
    >
      <div className="mx-auto max-w-4xl gap-y-6">
        {footerSponsors.length > 0 ? (
          <div className="gap-y-6">
            <div className="mx-auto mb-4 w-5/6 text-center md:w-full font-bold text-xl">
              Special thanks to our sponsors for powering our mission.
            </div>

            <div className="md:hidden">
              <Carousel
                slides={footerSponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="px-8 py-4 aspect-video w-full sm:w-[300px] md:w-[400px] mx-auto h-[200px]"
                  >
                    <SponsorSlide sponsor={sponsor} />
                  </div>
                ))}
              />
            </div>
            <div className="hidden md:block my-5">
              <div className="flex gap-5 justify-evenly">
                {footerSponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="aspect-video m-auto w-full max-h-[150px] px-5"
                  >
                    <SponsorSlide key={sponsor.name} sponsor={sponsor} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Main Footer */}
        <div className="flex md:flex-row flex-col min-h-[160px] justify-between border-0 border-y border-solid border-gray-400 py-6 leading-9">
          <div className="mx-auto w-80 items-center leading-3 md:ml-0 md:max-w-[240px] md:items-start mb-8 md:mb-0">
            <LogoFullColor className="w-full mb-4 md:mb-0" />
            <div className="text-center text-small">
              SC2 is 501(c)(3) non-profit focused on providing STEM
              opportunities for students in and around Franklin County PA.
            </div>
          </div>

          {/* Links */}
          <div className="justify-between md:flex grid grid-cols-2 gap-6 mx-auto md:mx-0 mt-4">
            {footerSections.map((section, i) => (
              <div
                key={i}
                className="flex md:w-32 flex-col text-center md:text-left"
              >
                <div className="font-bold text-lg">{section.title}</div>
                <Divider className="bg-foreground mb-2 mt-1" />
                {section.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-foreground hover:text-primary transition mx-auto md:mx-0"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto flex w-60 md:w-70 items-center justify-between gap-y-2 md:w-full md:flex-row flex-col-reverse py-2">
          <div className="text-center md:text-left text-sm text-gray-400">
            {`Copyright © ${new Date().getFullYear()} South Central STEM Collective.`}
          </div>
          <div className="flex justify-end">
            {footerButtons.map((button, i) => (
              <ActionIcon
                key={i}
                href={button.href}
                icon={button.icon}
                color="default"
                className="hover:text-primary"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
