import {
  IconCalendar,
  IconExternalLink,
  IconMapPin,
  IconRobotFace,
  IconTool,
  IconUsersGroup,
} from "@tabler/icons-react";
import { clsx } from "clsx";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Countdown } from "@/components/Countdown";
import { LinkButton } from "@/components/LinkButton";
import { PatternBackground } from "@/components/PatternBackground";
import HeroHeader from "@/components/page/HeroHeader";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Icon } from "@/lib/utils";

export const metadata: Metadata = {
  title: "2026 Kickoff | Biohazard",
  description:
    "Join Biohazard 4050 for the 2026 FIRST Robotics Competition kickoff",
};

const KICKOFF_CONFIG = {
  event: {
    date: new Date("2026-01-10T12:00:00-05:00"),
    displayDate: "January 10, 2026 at 12:00 PM EST",
  },
  location: {
    name: "SCSTEM Workspace",
    address: "20 South Main Street, Downtown Chambersburg",
    directionsLink: "https://wiki.scstem.org/workspace/#directions",
  },
  media: {
    headerImage: "/image/cheering.webp",
    liveStreamUrl: "https://www.firstinspires.org/robotics/frc/kickoff",
    teasers: [
      "https://www.youtube.com/watch?v=2AEdAID2U2o", // FIRST season teaser (FLL, FTC, FRC)
      "https://www.youtube.com/watch?v=0JaguGctF1A", // FRC 2026 teaser
    ],
  },
} as const;

export default function KickoffPage(): ReactNode {
  return (
    <>
      <HeroHeader img={KICKOFF_CONFIG.media.headerImage}>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">
          2026 Season Kickoff
        </h1>
        <h2 className="text-xl md:text-3xl font-sans text-white mt-4">
          Join Biohazard 4050 as we unveil this year&apos;s challenge
        </h2>
      </HeroHeader>
      <PatternBackground pattern="circuit" color="green">
        <div className="space-y-20 md:space-y-28 py-16">
          <CountdownSection />
          <BuildSeasonSection />
          <ResourcesSection />
          <DirectionsSection />
        </div>
      </PatternBackground>
    </>
  );
}

function PageSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx("p-8 md:max-w-(--breakpoint-xl) mx-auto", className)}
    >
      {children}
    </section>
  );
}

function CountdownSection() {
  return (
    <PageSection>
      <div className="text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-heading font-bold">
          Kickoff Begins In
        </h2>
        <Countdown targetDate={KICKOFF_CONFIG.event.date} showSeconds={true} />
        <p className="text-lg md:text-xl text-foreground-600">
          {KICKOFF_CONFIG.event.displayDate}
        </p>
      </div>
    </PageSection>
  );
}

const buildSeasonInfo: {
  icon: Icon;
  title: string;
  description: string;
}[] = [
  {
    icon: IconCalendar,
    title: "6 Weeks",
    description:
      "From kickoff to competition, teams have 6 weeks to design, build, and program a robot",
  },
  {
    icon: IconUsersGroup,
    title: "Ages 14-18",
    description:
      "High school students work alongside adult mentors to tackle real engineering challenges",
  },
  {
    icon: IconTool,
    title: "Hands-On",
    description:
      "Learn CAD, programming, electronics, fabrication, and project management",
  },
  {
    icon: IconRobotFace,
    title: "Competition Ready",
    description:
      "Build a 120-pound robot to compete in regional and world championship events",
  },
];

function BuildSeasonSection() {
  return (
    <PageSection>
      <h2 className="text-3xl font-heading font-bold text-center mb-12">
        What is Build Season?
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {buildSeasonInfo.map((item, i) => (
          <div key={i} className="space-y-3">
            <div className="flex flex-row space-x-3">
              <div className="bg-linear-to-br from-green-500 via-green-700 to-green-900 shadow-md border-none size-fit p-1.5 rounded-md">
                <item.icon size={30} stroke={1.5} />
              </div>
              <h3 className="font-bold text-xl my-auto">{item.title}</h3>
            </div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function ResourcesSection() {
  return (
    <PageSection className="space-y-12">
      <h2 className="text-3xl font-heading font-bold text-center">
        Watch the Kickoff
      </h2>

      {/* Live Stream Link */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Live Stream</h3>
        <LinkButton
          href={KICKOFF_CONFIG.media.liveStreamUrl}
          size="lg"
          className="bg-linear-to-br from-green-500 to-green-700 text-white shadow-lg"
          endContent={<IconExternalLink />}
        >
          Watch on FIRST Website
        </LinkButton>
      </div>

      {/* Season Teaser Videos - Only show if URLs are provided */}
      {KICKOFF_CONFIG.media.teasers.some((url) => url) && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center">Season Teasers</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {KICKOFF_CONFIG.media.teasers.map(
              (url, i) =>
                url && (
                  <VideoPlayer
                    key={i}
                    url={url}
                    classNames={{ icon: "text-green-500" }}
                  />
                ),
            )}
          </div>
        </div>
      )}
    </PageSection>
  );
}

function DirectionsSection() {
  return (
    <PageSection>
      <div className="bg-linear-to-br from-green-900 to-green-700 rounded-lg p-8 shadow-2xl text-white space-y-6">
        <div className="text-center space-y-4">
          <IconMapPin size={48} className="mx-auto" />
          <h2 className="text-3xl font-heading font-bold">
            Join Us for Kickoff
          </h2>
          <p className="text-xl">
            {KICKOFF_CONFIG.location.name}
            <br />
            {KICKOFF_CONFIG.location.address}
          </p>
          <LinkButton
            href={KICKOFF_CONFIG.location.directionsLink}
            size="lg"
            className="bg-yellow-400 text-black shadow-lg hover:bg-yellow-500"
            endContent={<IconExternalLink />}
          >
            Get Directions &amp; Parking Info
          </LinkButton>
        </div>
      </div>
    </PageSection>
  );
}
