import { Button } from "@heroui/button";
import { IconMoodHappy, IconRobotFace, IconTool } from "@tabler/icons-react";
import { IconUsersGroup } from "@tabler/icons-react";
import { clsx } from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode, JSX } from "react";

import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoHeader } from "@/components/page/VideoHeader";
import { Underline } from "@/components/spans";
import type { Icon } from "@/lib/utils";

import biohazardHeaderLogo from "@/image/biohazard/header-logo.svg";
import troubleLogo from "@/image/biohazard/trouble-logo.webp";
import viperLogo from "@/image/biohazard/viper-logo.webp";

import { ParallaxImage } from "./components";

export const metadata: Metadata = {
  title: "Biohazard",
};

export default function FRC(): ReactNode {
  return (
    <>
      <VideoHeader
        src={{
          webm: "/video/biohazard/home-video.webm",
          mp4: "/video/biohazard/home-video.mp4",
          image: "/image/biohazard/home-image.webp",
        }}
      >
        <div className="flex size-full flex-col md:w-[750px] lg:w-[1000px] md:mx-auto text-center justify-center px-4 md:px-0 space-y-6">
          <Image src={biohazardHeaderLogo} alt="Biohazard FRC team logo" />
          <h1 className="text-2xl md:text-4xl font-heading font-bold md:font-normal">
            Welcome to the <Underline>next generation</Underline> of thinkers,
            engineers scientists, artists, and dreamers.
          </h1>
          <h2 className="font-sans text-xl lg:text-3xl">
            Inspiring students since <Underline>2012</Underline>, Biohazard is
            south-central Pennsylvania&apos;s premiere high-school robotics team
            and we need you to take us to the <Underline>next level</Underline>.
          </h2>
        </div>
      </VideoHeader>
      <PatternBackground pattern="circuit" color="green">
        <div className="space-y-20 md:space-y-28 py-16">
          <PageSection className="space-y-16 md:space-y-24">
            <TeamOverview />
            <StatsGroup />
          </PageSection>
          <div>
            <a href="/programs/frc/robots">
              <h1 className="heading-1 text-center m-5">
                Check out our robots!
              </h1>
              <ParallaxImage background="/image/biohazard/2023-robot-field.webp">
                <div className="relative top-[160px] left-[10px] md:left-[100px] md:top-[250px] lg:top-[200px] w-[200px] md:w-[300px]">
                  <Image src={viperLogo} className="aspect-square" alt="" />
                </div>
              </ParallaxImage>
              <ParallaxImage background="/image/biohazard/2024-robot-field.webp">
                <div className="relative top-[150px] right-[-150px] md:right-[-700px] lg:right-[-900px] w-[250px] md:w-[400px]">
                  <Image src={troubleLogo} className="aspect-square" alt="" />
                </div>
              </ParallaxImage>
            </a>
          </div>
          <PageSection className="lg:!mt-10">
            <VideoPlayer
              url="https://youtu.be/147CgudTur8"
              classNames={{ icon: "text-green-500" }}
              placeholder="/image/morethanrobots.webp"
            />
          </PageSection>
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
    <section className={clsx("p-8 md:max-w-screen-xl mx-auto", className)}>
      {children}
    </section>
  );
}

const teamOverview: {
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
    title: "Hands-on learning",
    description:
      "Gain valuable experience in engineering, programming, and problem solving that will help you in your future career. ",
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

function TeamOverview() {
  return (
    <div className="p-5 flex gap-16 flex-col lg:flex-row">
      <div className="space-y-8 flex flex-row lg:flex-col">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white font-sans">
            Join the Biohazard revolution and prepare for the hardest fun
            you&apos;ll ever have.
          </h2>
          <div>
            <i>FIRST®</i> Robotics Competition (FRC) is a &ldquo;Sport for the
            Mind&rdquo; where creativity, determination, and teamwork are the
            keys to success as we compete with teams from around the world.
          </div>
        </div>
        <Button
          as={Link}
          size="lg"
          href="/get-involved"
          className="shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-black lg:w-fit m-auto w-full justify-center"
        >
          Join the Revolution
        </Button>
      </div>
      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-10 md:gap-4">
        {teamOverview.map((item, i) => (
          <div key={i} className="space-y-3">
            <div className="flex flex-row space-x-3">
              <div className="bg-gradient-to-br from-green-500 via-green-700 to-green-900 shadow-md border-none size-fit p-1.5 rounded-md">
                <item.icon size={30} stroke={1.5} />
              </div>
              <h3 className="font-bold text-xl my-auto">{item.title}</h3>
            </div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const stats: {
  stats: string;
  title: ReactNode;
  description: ReactNode;
}[] = [
  {
    stats: "12+ years",
    title: (
      <>
        <i>FIRST®</i> Robotics Competition
      </>
    ),
    description:
      "Biohazard has been an active FRC team since 2012 and we are not stopping any time soon. ",
  },
  {
    stats: "10+ mentors",
    title: "Guiding and teaching",
    description:
      "Learn from industry experts in their fields who are ready to help you get to the next level.",
  },
  {
    stats: "Endless",
    title: "Opportunities",
    description:
      "Scholarships, hands-on education, and access to an extensive employer, alumni, and community network.",
  },
];

function StatsGroup() {
  return (
    <div className=" sm:p-5 sm:px-0 px-5 py-0 rounded-lg bg-gradient-to-br from-green-900 to-green-700 shadow-2xl relative">
      <div className="absolute size-full bg-background -z-10 inset-0"></div>
      <div className="flex flex-col sm:flex-row divide-solid divide-x-0 sm:divide-x-2 sm:divide-y-0 divide-y-2 divide-white">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex-1 sm:pl-5 sm:pb-0 pl-0 pb-5 pt-4 space-y-2 sm:pr-8 text-white"
          >
            <div className="text-3xl font-bold font-heading">{stat.stats}</div>
            <div className="uppercase font-bold text-sm">{stat.title}</div>
            <div className="text-sm">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
