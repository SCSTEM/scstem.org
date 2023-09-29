import Link from "@docusaurus/Link";
import { Grid, Title, Text, Divider } from "@mantine/core";
import {
  IconBooks,
  IconDeviceGamepad2,
  IconExternalLink,
  IconLego,
  IconMoodSmile,
  IconPlayerPlay,
  IconPresentation,
  IconRobot,
  IconTool,
} from "@tabler/icons-react";
import Heading from "@theme/Heading";
import IdealImage from "@theme/IdealImage";
import { clsx } from "clsx";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

import HeroHeader from "@site/src/components/HeroHeader";
import FeatureCard, {
  FeatureCardProps,
} from "@site/src/components/cards/FeatureCard";
import { Button } from "@site/src/components/inputs/Button";
import DefaultLayout from "@site/src/layouts/Default";

import Section from "../components/Section";
import Underline from "../components/spans/Underline";
import { useColorScheme } from "../hooks/colorScheme";
import classes from "./index.module.css";

const programs: FeatureCardProps[] = [
  {
    key: "fll",
    title: (
      <>
        <span className="italic inline">FIRST®</span> LEGO® League
      </>
    ),
    body: "FLL introduces science, technology, engineering, and math (STEM) to children through fun, exciting hands-on learning. Participants gain real-world problem-solving experiences through a guided, global robotics program, helping today's students and teachers build a better future together.",
    Icon: IconLego,
    color: "brand-red",
    link: "/clubs/fll",
    badge: "Ages 9 - 16",
    img: {
      src: require("../idealimage/unsplash/lego-robots.jpg"),
      alt: "Lego® robots",
    },
  },
  {
    key: "ftc",
    title: (
      <>
        <span className="italic">FIRST®</span> Tech Challenge
      </>
    ),
    body: "FTC students learn to think like engineers. Teams design, build, and code robots to compete in an alliance format against other teams. Robots are built from a reusable platform, powered by Android technology, and can be coded using a variety of levels of Java-based programming.",
    Icon: IconDeviceGamepad2,
    color: "brand-orange",
    link: "/clubs/ftc",
    badge: "Ages 12 - 18",
    img: {
      src: require("../idealimage/ftc-robot.jpg"),
      alt: `Team 18035 "Reconnecting"'s robot`,
    },
  },
  {
    key: "frc",
    title: (
      <>
        <span className="italic">FIRST®</span> Robotics Competition
      </>
    ),
    body: "Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team “brand,” and advancing respect and appreciation for STEM within the local community.",
    Icon: IconRobot,
    color: "brand-blue",
    link: "/biohazard",
    badge: "Ages 14 - 18",
    img: {
      src: require("../idealimage/biohazard/frc-driveteam.jpg"),
      alt: `Team 4050 Biohazard's drive team and robot`,
    },
  },
];

const whyJoin: FeatureCardProps[] = [
  {
    key: "skills",
    title: "Learn real-world skills",
    body: (
      <>
        Get hands on with tools and technology under the supervision of experts
        in their fields in everything from engineering to marketing. Learn not
        only how the tools work, but how to use them effectively.
      </>
    ),
    Icon: IconTool,
    img: {
      src: require("../idealimage/hands-on-2.jpg"),
      alt: "A student and mentor get hands-on with a robot",
      placement: "bottom",
    },
  },
  {
    key: "leadership",
    title: "Experience leadership and teamwork",
    body: (
      <>
        Build strong relationships with teammates and mentors as you work
        together throughout the season. Learn how to make decisions as a team
        and take leadership in your area of expertise.
      </>
    ),
    Icon: IconPresentation,
    img: {
      src: require("../idealimage/leadership-1.jpg"),
      alt: "Two students referencing a whiteboard during a planning meeting",
      placement: "bottom",
    },
  },
  {
    key: "competition",
    title: "Education through competition",
    body: (
      <>
        Prepare to compete against teams from around the world with a limited
        time-frame, tight budget, and a complex challenge. Learn how to work
        under pressure and build reliable systems that can handle intense
        competition.
      </>
    ),
    Icon: IconBooks,
    img: {
      src: require("../idealimage/biohazard/competition-1.jpg"),
      alt: "Team members cheering at competition",
      placement: "bottom",
    },
  },
  {
    key: "scholarships",
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
    Icon: IconBooks,
    img: {
      src: require("../idealimage/biohazard/award.jpg"),
      alt: "Team members receiving an award at competition",
      placement: "bottom",
    },
  },
  {
    key: "fun",
    title: "Fun",
    body: (
      <>
        Although we take our work seriously, we also have a lot of fun. Whether
        it's dancing to the YMCA at competition, playing a game of Kahoot during
        a meeting, or just hanging out with friends as we work on our robots, we
        always manage to have a lot of fun.
      </>
    ),
    Icon: IconMoodSmile,
    img: {
      src: require("../idealimage/biohazard/dean.jpg"),
      alt: "Team members sharing a moment with Dean Kamen, the founder of FIRST®",
      placement: "bottom",
    },
  },
];

export default function Home(): JSX.Element {
  const [videoReady, setVideoReady] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <DefaultLayout
      title="Home"
      description="The South Central STEM Collective is a non-profit organization focused on building the future of STEM, right here in Franklin County, Pennsylvania."
    >
      <HeroHeader img="/img/legos.webp">
        <div className="flex flex-col space-y-5 text-white">
          <Heading as="h4" className="text-4xl font-bold md:text-5xl mb-0">
            <span className="dark:text-yellow text-brand-blue-4">Robots</span>{" "}
            are in Franklin County.
            <Underline
              className="before:whitespace-pre-line before:content-['\a']"
              color={colorScheme === "light" ? "brand-blue" : undefined}
            >
              So are we.
            </Underline>
          </Heading>
          <div className="text-2xl">
            The South Central STEM Collective is a non-profit organization
            focused on building the future of STEM, right here in Franklin
            County, Pennsylvania.
          </div>
        </div>
      </HeroHeader>

      <main className={clsx(classes.background, "relative")}>
        <div className="absolute w-full h-full -z-20 dark:bg-[url('/img/svg/hexagons-dark.svg')] bg-[url('/img/svg/hexagons-light.svg')] bg-repeat" />

        <div className="lg:space-y-28 space-y-12 my-28">
          {/* Overview */}
          <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-lg px-6">
            <Title order={2} className="text-center">
              Science, Technology, Engineering, Math, Business, Art, and more
            </Title>
            <Text
              size="lg"
              className="max-w-5xl m-auto dark:opacity-65 text-center"
            >
              The South Central STEM Collective (otherwise known as SC2) was
              created to serve South Central Pennsylvania as "STEM Central";
              inspiring youth aged 9-18 with hands-on education, competitive
              robotics teams, and community outreach. With three rapidly growing
              programs and a team of experienced volunteer mentors, SC2 is the
              perfect place for students to learn real world skills in a fun and
              competitive atmosphere.
            </Text>
          </div>

          {/* Programs */}
          <Section title="Our Programs">
            <Grid gutter="lg" justify="center">
              {programs.map((program) => (
                <Grid.Col key={program.key} span={{ md: 6, lg: 4 }}>
                  <FeatureCard key={program.key} {...program} />
                </Grid.Col>
              ))}
            </Grid>
          </Section>

          {/* FIRST */}
          <Section alt>
            <div className="md:w-[750px] mb-8 mx-auto">
              <IdealImage
                img={require("../idealimage/first/first-horizontal-acro-light.png")}
                alt="FIRST® logo and acronym"
                className="dark:hidden"
              />
              <IdealImage
                img={require("../idealimage/first/first-horizontal-acro-dark.png")}
                alt="FIRST® logo and acronym"
                className="hidden dark:block"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 items-center">
              <div className="flex-grow md:mr-12 mb-12 md:mb-0 flex flex-col space-y-4 md:max-w-2xl">
                <div className="rounded-3xl flex flex-col space-y-4">
                  <Title order={4} className="md:text-left text-center">
                    Who is <span className="italic">FIRST®</span>?
                  </Title>
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
                      to="https://www.firstinspires.org/"
                      rightSection={<IconExternalLink />}
                      color={
                        colorScheme === "dark" ? "brand-yellow" : "brand-blue"
                      }
                      variant="subtle"
                      size="compact-sm"
                    >
                      <span className="italic">FIRST®</span>
                    </Button>
                  </div>
                </div>

                <Divider
                  color={colorScheme === "dark" ? "brand-gray" : "brand-dark"}
                />

                <div className="rounded-3xl space-y-4 flex flex-col">
                  <Title order={4} className="text-center md:text-left">
                    More Than Robots
                  </Title>
                  <div>
                    Although the goal is to build a robot, you do not have to be
                    an engineer. Whether you are a future rocket scientist or an
                    aspiring artist, there is a place here for you and mentors
                    ready to use their real world experience to help you grow.
                  </div>
                  <div className="ml-auto">
                    <Button
                      to="https://info.firstinspires.org/morethanrobots"
                      rightSection={<IconExternalLink />}
                      color={
                        colorScheme === "dark" ? "brand-yellow" : "brand-blue"
                      }
                      variant="subtle"
                      size="compact-sm"
                    >
                      More Than Robots
                    </Button>
                  </div>
                </div>
              </div>

              <IdealImage
                img={require("../idealimage/morethanrobots.jpg")}
                alt="Collage of photos capturing some of the many ways students can get involved"
                className="overflow-hidden rounded-3xl md:max-w-2xl"
              />
            </div>
          </Section>

          {/* Why Join */}
          <Section title="Why join?">
            <Grid gutter="md" justify="center">
              {whyJoin.map((wj) => (
                <Grid.Col key={wj.key} span={{ md: 6, lg: 4 }}>
                  <FeatureCard {...wj} />
                </Grid.Col>
              ))}
            </Grid>
          </Section>

          {/* Video */}
          <div className="aspect-video dark:border-yellow border-blue border-8 border-solid w-11/12 mx-auto xl:max-w-6xl rounded-xl">
            <div
              className={clsx(
                "absolute dark:bg-yellow bg-blue mx-auto w-11/12 md:w-fit left-0 right-0 text-center text-white dark:text-black pb-2 md:pb-1 text-sm md:text-2xl md:rounded-b-lg md:px-2 font-semibold transition-opacity duration-200",
                videoReady ? "opacity-0" : "opacity-100",
              )}
            >
              Meet our highschool team, learn about{" "}
              <span className="italic">FIRST®</span>
            </div>

            <ReactPlayer
              className="-z-10"
              url="https://youtu.be/147CgudTur8"
              controls
              light="/img/doc-thumb.webp"
              volume={0.4}
              width="100%"
              height="100%"
              playIcon={
                <IconPlayerPlay className="dark:text-yellow text-blue md:w-24 md:h-24 w-16 h-16" />
              }
              onReady={() => setVideoReady(true)}
            />
          </div>

          <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-lg px-6 py-5">
            <Title className="mx-auto text-center" order={2}>
              Ready to join or find out more? Contact us!
            </Title>
            <Text
              c={colorScheme === "dark" ? "dimmed" : undefined}
              size="lg"
              className="max-w-5xl text-center"
            >
              We are always looking for new members, mentors, and sponsors! If
              you want to find out how you can get plugged in or are looking for
              more information, please reach out through our{" "}
              <Link to="/get-involved">Get Involved form</Link>.
            </Text>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
