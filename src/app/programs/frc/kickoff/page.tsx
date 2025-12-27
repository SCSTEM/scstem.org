import {
  IconCalendar,
  IconExternalLink,
  IconLink,
  IconMapPin,
  IconMoodHappy,
  IconRobotFace,
  IconTool,
  IconUsersGroup,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import { Countdown } from "@/components/Countdown";
import { LinkButton } from "@/components/LinkButton";
import { PatternBackground } from "@/components/PatternBackground";
import HeroHeader from "@/components/page/HeroHeader";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Icon } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "2026 Kickoff | Biohazard",
  description:
    "Join Biohazard 4050 for the 2026 FIRST Robotics Competition kickoff",
};

const KICKOFF_CONFIG = {
  event: {
    date: new Date("2026-01-10T12:00:00-05:00"),
    // date: new Date("2025-12-25"),
    displayDate: "January 10, 2026 at 12:00 PM EST",
  },
  location: {
    name: "South Central STEM Collective Workspace",
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
    hints: [
      {
        title: "Hint #1",
        url: "https://www.youtube.com/watch?v=0JaguGctF1A",
      },
      {
        title: "Hint #2",
        url: "https://community.firstinspires.org/2025-game-hint-3-for-2026",
      },
    ],
  },
} as const;

export default function KickoffPage(): ReactNode {
  return (
    <>
      <HeroHeader
        img={KICKOFF_CONFIG.media.headerImage}
        centered
        classNames={{
          image: "object-[50%_75%]",
        }}
      >
        <div className="space-y-8 text-center w-full">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white drop-shadow-lg">
              2026 Season Kickoff
            </h1>
            <h2 className="text-xl md:text-2xl font-sans text-white/90">
              Join Biohazard as we unveil this year&apos;s challenge
            </h2>
          </div>

          {/* Countdown integrated into header */}
          <div className="max-w-5xl mx-auto">
            <Countdown
              targetDate={KICKOFF_CONFIG.event.date}
              showSeconds={true}
              expiredContent={
                <div className="space-y-6 bg-black/40 backdrop-blur-sm p-8 rounded-xl border-2 border-red-500 shadow-2xl">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                    🔴 Kickoff is Live!
                  </h3>
                  <LinkButton
                    href={KICKOFF_CONFIG.media.liveStreamUrl}
                    size="lg"
                    className="bg-red-600 text-white shadow-2xl hover:bg-red-700 font-bold text-xl px-8 py-6"
                    endContent={<IconExternalLink size={28} />}
                    target="_blank"
                  >
                    Watch Live Now
                  </LinkButton>
                </div>
              }
            />
          </div>
        </div>
      </HeroHeader>
      <PatternBackground pattern="circuit" color="green">
        <div className="space-y-16 md:space-y-24 py-16">
          <AboutFRCSection />
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
      className={cn("p-8 md:max-w-(--breakpoint-xl) mx-auto", className)}
    >
      {children}
    </section>
  );
}

const frcInfo: {
  icon: Icon;
  title: ReactNode;
  description: ReactNode;
}[] = [
  {
    icon: IconRobotFace,
    title: "Innovation",
    description: (
      <>
        Design and build complex robots to compete in <i>FIRST®</i>, using
        real-world skills to build the best robot possible.
      </>
    ),
  },
  {
    icon: IconTool,
    title: "Hands-on Learning",
    description:
      "Gain valuable experience in engineering, programming, and problem solving that will help you in your future career.",
  },
  {
    icon: IconUsersGroup,
    title: "Collaboration",
    description:
      "Work closely with a team of students and mentors, who will help turn your ideas into reality.",
  },
  {
    icon: IconMoodHappy,
    title: "Fun",
    description:
      "We compete hard, but we also have a lot of fun while doing it. Saturday lunches, team picnic, off-season events, and more.",
  },
];

const buildSeasonTimeline: {
  icon: Icon;
  title: string;
  description: string;
}[] = [
  {
    icon: IconCalendar,
    title: "Kickoff - January 10",
    description:
      "The game is revealed! Teams watch the live broadcast and receive the game manual to start strategizing.",
  },
  {
    icon: IconTool,
    title: "Build Season - 6 Weeks",
    description:
      "Design, prototype, build, and program a 120-pound robot. Teams meet multiple times per week to collaborate.",
  },
  {
    icon: IconRobotFace,
    title: "Competition - March & April",
    description:
      "Compete in regional events, form alliances, and work toward qualifying for the World Championship.",
  },
  {
    icon: IconUsersGroup,
    title: "Ages 14-18",
    description:
      "High school students work alongside adult mentors from industry to tackle real engineering challenges.",
  },
];

function AboutFRCSection() {
  return (
    <PageSection className="space-y-12">
      {/* Two-column layout on larger screens */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: What is FIRST? */}
        <div className="flex flex-col h-full gap-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            What is <i>FIRST®</i> Robotics Competition?
          </h2>
          <p className="text-lg">
            <i>FIRST®</i> Robotics Competition (FRC) is a &ldquo;Sport for the
            Mind&rdquo; where creativity, determination, and teamwork are the
            keys to success as we compete with teams from around the world.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {frcInfo.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex flex-row space-x-3 items-center">
                  <div className="bg-linear-to-br from-green-500 via-green-700 to-green-900 shadow-md border-none size-fit p-1.5 rounded-md">
                    <item.icon size={24} stroke={1.5} />
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <div className="text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Build Season Timeline */}
        <div className="flex flex-col gap-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            The Build Season Journey
          </h2>
          <div className="flex flex-col h-full justify-around">
            {buildSeasonTimeline.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="shrink-0">
                  <div className="bg-linear-to-br from-green-500 via-green-700 to-green-900 shadow-md border-none size-fit p-2 rounded-md">
                    <item.icon size={28} stroke={1.5} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function ResourcesSection() {
  const hasHints = KICKOFF_CONFIG.media.hints.some((hint) => hint.url);
  const hasTeasers = KICKOFF_CONFIG.media.teasers.some((url) => url);

  return (
    <PageSection className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">
        Watch the Kickoff
      </h2>

      {/* Live Stream - Prominent CTA */}
      <div className="bg-linear-to-br from-green-900 to-green-700 rounded-lg p-8 md:p-12 shadow-2xl text-white text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-heading font-bold">
          Live Stream
        </h3>
        <p className="text-lg">
          Join us on {KICKOFF_CONFIG.event.displayDate} as FIRST reveals the
          2026 game challenge!
        </p>
        <LinkButton
          href={KICKOFF_CONFIG.media.liveStreamUrl}
          size="lg"
          className="bg-yellow-400 text-black shadow-lg hover:bg-yellow-500 font-bold"
          endContent={<IconExternalLink />}
          target="_blank"
        >
          Watch on FIRST Website
        </LinkButton>
      </div>

      {/* Season Teaser Videos */}
      {hasTeasers && (
        <div className="space-y-6">
          <h3 className="text-2xl font-heading font-bold text-center">
            Teasers
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {KICKOFF_CONFIG.media.teasers.map((url) => (
              <VideoPlayer
                key={url}
                url={url}
                classNames={{ icon: "text-green-500" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Season Hints */}
      {hasHints && (
        <div className="space-y-6">
          <h3 className="text-2xl font-heading font-bold text-center">Hints</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {KICKOFF_CONFIG.media.hints.map((hint) => (
              <a
                key={hint.url}
                href={hint.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-linear-to-br from-green-800 to-green-900 rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-green-600 hover:border-green-400"
              >
                <IconLink size={28} className="text-green-400 shrink-0" />
                <span className="text-lg md:text-xl font-semibold text-white flex-1">
                  {hint.title}
                </span>
                <IconExternalLink
                  size={24}
                  className="text-green-300 shrink-0"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </PageSection>
  );
}

function DirectionsSection() {
  return (
    <PageSection className="space-y-8">
      {/* Shared Header */}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">
        Get Involved
      </h2>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Join Us for Kickoff */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          {/* Map Background */}
          <div className="absolute inset-0">
            <Image
              src="/image/map.webp"
              alt="Map to workspace"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-green-900/95 to-green-700/55" />
          </div>

          {/* Content */}
          <div className="relative p-8 text-white text-center space-y-6">
            <IconMapPin size={48} className="mx-auto" />
            <h3 className="text-2xl md:text-3xl font-heading font-bold">
              Join Us for Kickoff
            </h3>
            <p className="text-lg md:text-xl">
              {KICKOFF_CONFIG.location.name}
              <br />
              {KICKOFF_CONFIG.location.address}
            </p>
            <LinkButton
              href={KICKOFF_CONFIG.location.directionsLink}
              size="lg"
              className="bg-yellow-400 text-black shadow-lg hover:bg-yellow-500 font-bold"
              endContent={<IconExternalLink />}
              target="_blank"
            >
              Get Directions &amp; Parking Info
            </LinkButton>
          </div>
        </div>

        {/* Right: Can't Make It? */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          {/* Map Background */}
          <div className="absolute inset-0">
            <Image
              src="/image/get-involved.webp"
              alt="Map to workspace"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-green-700/55 to-green-900/95" />
          </div>

          {/* Content */}
          <div className="relative p-8 text-white text-center space-y-6">
            <IconUsersGroup size={48} className="mx-auto" />
            <h3 className="text-2xl md:text-3xl font-heading font-bold">
              Can&apos;t Make It?
            </h3>
            <p className="text-lg md:text-xl">
              Interested in joining Biohazard but can&apos;t attend kickoff?
              We&apos;d still love to have you on the team!
            </p>
            <LinkButton
              href="/get-involved"
              size="lg"
              className="bg-yellow-400 text-black shadow-lg hover:bg-yellow-500 font-bold"
            >
              Join the Team
            </LinkButton>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
