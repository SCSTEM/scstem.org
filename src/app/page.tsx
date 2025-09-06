import { Button, Divider, Link } from "@heroui/react";
import {
  IconBooks,
  IconExternalLink,
  IconLego,
  IconMoodSmile,
  IconPresentation,
  IconRobotFace,
  IconTool,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { FeatureCardProps } from "@/components/cards/FeatureCard";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";
import HeroHeader from "@/components/page/HeroHeader";
import Section from "@/components/page/Section";
import { Highlight, Underline } from "@/components/spans";
import { VideoPlayer } from "@/components/VideoPlayer";

import awardImage from "@/image/award.webp";
import competition1Image from "@/image/competition-1.webp";
import deanImage from "@/image/dean.webp";
import firstHorizontalAcroDarkImage from "@/image/first/first-horizontal-acro-dark.png";
import firstHorizontalDarkImage from "@/image/first/first-horizontal-dark.png";
import frcImage from "@/image/frc-driveteam.webp";
import handsOn2Image from "@/image/hands-on-2.webp";
import leadership1Image from "@/image/leadership-1.webp";
import fllImage from "@/image/lego-robots.webp";
import moreThanRobotsImage from "@/image/morethanrobots.webp";

const programCards: FeatureCardProps[] = [
  {
    title: (
      <>
        <span className="italic inline">FIRST®</span> LEGO® League
      </>
    ),
    body: "FLL introduces science, technology, engineering, and math (STEM) to children through fun, exciting hands-on learning. Participants gain real-world problem-solving experiences through a guided, global robotics program, helping today's students and teachers build a better future together.",
    icon: IconLego,
    color: "orange",
    link: "/programs/fll",
    badge: "Ages 9 - 16",
    img: { src: fllImage, alt: "Lego® robots" },
  },
  {
    title: (
      <>
        <span className="italic">FIRST®</span> Robotics Competition
      </>
    ),
    body: "Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team “brand,” and advancing respect and appreciation for STEM within the local community.",
    icon: IconRobotFace,
    color: "blue",
    link: "/programs/frc",
    badge: "Ages 13 - 18",
    img: { src: frcImage, alt: `Team 4050 Biohazard's drive team and robot` },
  },
];

const joinCards: FeatureCardProps[] = [
  {
    title: "Learn real-world skills",
    body: (
      <>
        Get hands on with tools and technology under the supervision of experts
        in their fields in everything from engineering to marketing. Learn not
        only how the tools work, but how to use them effectively.
      </>
    ),
    icon: IconTool,
    img: {
      src: handsOn2Image,
      alt: "A student and mentor get hands-on with a robot",
      placement: "bottom",
    },
  },
  {
    title: "Experience leadership and teamwork",
    body: (
      <>
        Build strong relationships with teammates and mentors as you work
        together throughout the season. Learn how to make decisions as a team
        and take leadership in your area of expertise.
      </>
    ),
    icon: IconPresentation,
    img: {
      src: leadership1Image,
      alt: "Two students referencing a whiteboard during a planning meeting",
      placement: "bottom",
    },
  },
  {
    title: "Education through competition",
    body: (
      <>
        Prepare to compete against teams from around the world with a limited
        time-frame, tight budget, and a complex challenge. Learn how to work
        under pressure and build reliable systems that can handle intense
        competition.
      </>
    ),
    icon: IconBooks,
    img: {
      src: competition1Image,
      alt: "Team members cheering at competition",
      placement: "bottom",
    },
  },
  {
    title: "Scholarships and career opportunities",
    body: (
      <>
        Being a member of a <span className="italic">FIRST®</span> team is more
        than just building robots and learning about STEM. It opens doors to
        scholarship and career opportunities that you cannot get anywhere else.
        Many of our alumni used the skills developed while students to pursue
        careers in STEM (and related) fields.
      </>
    ),
    icon: IconBooks,
    img: {
      src: awardImage,
      alt: "Team members receiving an award at competition",
      placement: "bottom",
    },
  },
  {
    title: "Fun",
    body: (
      <>
        Although we take our work seriously, we also have a lot of fun. Whether
        it&apos;s dancing to the YMCA at competition, playing a game of Kahoot
        during a meeting, or just hanging out with friends as we work on our
        robots, we always manage to have a lot of fun.
      </>
    ),
    icon: IconMoodSmile,
    img: {
      src: deanImage,
      alt: "Team members sharing a moment with Dean Kamen, the founder of FIRST®",
      placement: "bottom",
    },
  },
];

export const metadata: Metadata = {
  description:
    "The South Central STEM Collective is a non-profit organization focused on building the future of STEM, right here in Franklin County, Pennsylvania.",
};

export default function Home(): ReactNode {
  return (
    <>
      <HeroHeader img="/image/legos.webp">
        <div className="flex flex-col space-y-5 text-foreground">
          <div className="text-4xl font-bold md:text-5xl">
            <Highlight>Robots</Highlight> are in Franklin County.
            <Underline className="before:whitespace-pre-line before:content-['\a']">
              So are we.
            </Underline>
          </div>
          <div className="text-2xl">
            The South Central STEM Collective is a non-profit organization
            focused on building the future of STEM, right here in Franklin
            County, Pennsylvania.
          </div>
        </div>
      </HeroHeader>

      <PatternBackground pattern="circuit">
        <div className="lg:space-y-20 space-y-12 py-20 md:py-28">
          {/* Overview */}
          <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-(--breakpoint-lg) px-6">
            <h2 className="heading-2 text-center">
              Science, Technology, Engineering, Math, Business, Art, and more
            </h2>
            <div className="max-w-5xl text-center text-lg">
              The South Central STEM Collective (otherwise known as SC2) was
              created to serve South Central Pennsylvania as &lsquo;STEM
              Central&rsquo;; inspiring youth aged 9-18 with hands-on education,
              competitive robotics teams, and community outreach. With three
              rapidly growing programs and a team of experienced volunteer
              mentors, SC2 is the perfect place for students to learn real world
              skills in a fun and competitive atmosphere.
            </div>
          </div>

          {/* Programs */}
          <Section>
            <div className="flex flex-wrap justify-center gap-5">
              {programCards.map((card, i) => (
                <div key={i}>
                  <FeatureCard {...card} />
                </div>
              ))}
            </div>
          </Section>

          {/* FIRST */}
          <Section alt>
            <div className="md:max-w-[750px] mb-8 mx-auto">
              <Image
                src={firstHorizontalAcroDarkImage}
                alt="FIRST® logo and acronym"
                className="hidden md:block"
              />
              <Image
                src={firstHorizontalDarkImage}
                alt="FIRST® logo and acronym"
                className="md:hidden"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 items-center">
              <div className="grow md:mr-12 mb-12 md:mb-0 flex flex-col space-y-4">
                <div className="rounded-3xl flex flex-col space-y-4">
                  <h4 className="md:text-left text-center heading-4">
                    Who is <span className="italic">FIRST®</span>?
                  </h4>
                  <div>
                    All of our programs are members of a global organization
                    called <span className="italic">FIRST®</span>. The mission
                    of <span className="italic">FIRST®</span> is to inspire
                    young people to become leaders in science and technology
                    fields by teaching real-world skills through team work and
                    competition. Each year, a new challenge is presented to
                    teams who, with the help of experienced mentors, must apply
                    their skills to build a functional robot. Once built, the
                    robot is put to the test in a competition setting against
                    teams from around the world.
                  </div>
                  <div className="ml-auto">
                    <Button
                      as={Link}
                      href="https://www.firstinspires.org/"
                      target="_blank"
                      endContent={<IconExternalLink />}
                      variant="light"
                      color="primary"
                    >
                      <span className="italic">FIRST®</span>
                    </Button>
                  </div>
                </div>

                <Divider className="bg-white/50" />

                <div className="rounded-3xl space-y-4 flex flex-col">
                  <h4 className="text-center md:text-left heading-4">
                    More Than Robots
                  </h4>
                  <div>
                    Although the goal is to build a robot, you do not have to be
                    an engineer. Whether you are a future rocket scientist or an
                    aspiring artist, there is a place here for you and mentors
                    ready to use their real world experience to help you grow.
                  </div>
                  <div className="ml-auto">
                    <Button
                      as={Link}
                      href="https://info.firstinspires.org/morethanrobots"
                      target="_blank"
                      endContent={<IconExternalLink />}
                      variant="light"
                      color="primary"
                    >
                      More Than Robots
                    </Button>
                  </div>
                </div>
              </div>

              <Image
                src={moreThanRobotsImage}
                alt="Collage of photos capturing some of the many ways students can get involved including robot design, photography, video, and more."
                className="overflow-hidden rounded-3xl md:max-w-2xl lg:block hidden"
              />
            </div>
          </Section>

          {/* Why Join */}
          <Section title="Why join?">
            <div className="flex flex-wrap justify-center gap-5">
              {joinCards.map((card, i) => (
                <div key={i}>
                  <FeatureCard {...card} />
                </div>
              ))}
            </div>
          </Section>

          {/* Video */}
          <VideoPlayer
            url="https://youtu.be/147CgudTur8"
            placeholder="/image/morethanrobots.webp"
          />

          <div className="flex flex-col items-center gap-y-6 mx-auto md:max-w-(--breakpoint-lg) px-6 py-5">
            <h2 className="heading-2 mx-auto text-center">
              Ready to join or find out more? Contact us!
            </h2>
            <div className="max-w-5xl text-center text-lg">
              We are always looking for new members, mentors, and sponsors! If
              you want to find out how you can get plugged in or are looking for
              more information, please reach out through our{" "}
              <Link href="/get-involved">Get Involved form</Link>.
            </div>
          </div>
        </div>
      </PatternBackground>
    </>
  );
}
