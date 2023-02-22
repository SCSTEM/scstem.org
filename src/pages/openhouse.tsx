import Link from "@docusaurus/Link";
import {
  Badge,
  Title,
  Text,
  useMantineColorScheme,
  MantineColor,
  Grid,
  Button,
  Divider,
} from "@mantine/core";
import {
  IconDeviceGamepad2,
  IconLego,
  IconPresentation,
  IconRobot,
  IconTool,
  IconBooks,
  IconMoodSmile,
  IconExternalLink,
} from "@tabler/icons-react";
import IdealImage from "@theme/IdealImage";
import React, { useEffect, useState } from "react";

import FeatureCard, {
  FeatureCardProps,
} from "@site/src/components/FeatureCard";
import HeroHeader from "@site/src/components/HeroHeader";
import Highlight from "@site/src/components/Highlight";
import DefaultLayout from "@site/src/layouts/Default";

const programs: FeatureCardProps[] = [
  {
    title: "FIRST Lego League",
    description:
      "FLL introduces science, technology, engineering, and math (STEM) to children through fun, exciting hands-on learning. Participants gain real-world problem-solving experiences through a guided, global robotics program, helping today's students and teachers build a better future together.",
    Icon: IconLego,
    color: "brand-red",
    link: "https://www.firstinspires.org/robotics/fll",
    badge: "Ages 4 - 16",
  },
  {
    title: "FIRST Tech Challenge",
    description:
      "FTC students learn to think like engineers. Teams design, build, and code robots to compete in an alliance format against other teams. Robots are built from a reusable platform, powered by Android technology, and can be coded using a variety of levels of Java-based programming.",
    Icon: IconDeviceGamepad2,
    color: "brand-orange",
    link: "https://www.firstinspires.org/robotics/ftc",
    badge: "Ages 12 - 18",
  },
  {
    title: "FIRST Robotics Competition",
    description:
      "Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team “brand,” and advancing respect and appreciation for STEM within the local community.",
    Icon: IconRobot,
    color: "brand-blue",
    link: "https://www.firstinspires.org/robotics/frc",
    badge: "Ages 14 - 18",
  },
];

const whyJoin: FeatureCardProps[] = [
  {
    title: "Learn real-world skills",
    description:
      "Get hands on experience with tools and technology that you cannot get anywhere else.",
    Icon: IconTool,
  },
  {
    title: "Experience leadership and teamwork",
    description:
      "Dolore proident ut cupidatat in deserunt duis aute dolore exercitation dolor.",
    Icon: IconPresentation,
  },
  {
    title: "Education through competition",
    description:
      "Voluptate nulla veniam ullamco voluptate do aliquip consequat fugiat aliqua velit mollit.",
    Icon: IconBooks,
  },
  {
    title: "Scholarships and career opportunities",
    description: "Est commodo aliquip voluptate laborum eu anim ea.",
    Icon: IconBooks,
  },
  {
    title: "Fun",
    description:
      "Reprehenderit reprehenderit esse quis reprehenderit irure in eiusmod sint est consectetur reprehenderit occaecat qui.",
    Icon: IconMoodSmile,
  },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <div className="py-3 mb-4 px-8 md:max-w-screen-xl mx-auto">
    <Title
      order={3}
      className="text-2xl font-black mb-6 text-center md:text-left"
    >
      {title}
    </Title>
    {children}
  </div>
);

export default function Sponsors(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const [color, setColor] = useState<MantineColor>("brand-dark");

  useEffect(() => {
    colorScheme === "dark" ? setColor("brand-yellow") : setColor("brand-blue");
  }, [colorScheme]);

  return (
    <DefaultLayout>
      <HeroHeader img="/img/students.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Want to know more about <Highlight theme="dark">STEM</Highlight> and{" "}
            <Highlight theme="dark">Robots</Highlight>?
          </div>
          <div className="text-2xl">
            Join us for our open house on{" "}
            <Highlight theme="dark">Thursday, March 23 (7PM - 8:30)</Highlight>{" "}
            and Saturday,{" "}
            <Highlight theme="dark">
              March 25 (10AM - 11:30 and 1PM - 3)
            </Highlight>{" "}
            to see what we're all about.
          </div>
        </div>
      </HeroHeader>

      <div className="my-10">
        <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-xl px-6">
          <Badge size="lg" color={color}>
            Open to all ages
          </Badge>
          <Title
            order={2}
            align="center"
            className="md:text-3xl font-black text-xl"
          >
            Meet the teams, see the robots, and learn more about our programs.
          </Title>
          <Text
            color="dimmed"
            size="lg"
            className="max-w-4xl m-auto"
            align="center"
          >
            Are you or is someone you know interested in legos, science,
            technology, engineering, math, business, marketing, video
            production, software development, web design, carpentry, or
            leadership? Find out more and get a chance to speak with our
            students and mentors at our upcoming open house.
          </Text>
        </div>

        <Section title="Our Programs">
          <Grid gutter="md" justify="center">
            {programs.map((program) => (
              <Grid.Col md={6} lg={4} key={program.title}>
                <FeatureCard {...program} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        <div className="space-y-4 bg-zinc-200 dark:bg-dark shadow-inner my-8 py-12 px-8">
          <div className="md:max-w-screen-xl mx-auto md:px-12">
            <div className="md:w-[750px] mb-8 mx-auto">
              <IdealImage
                img={require("../../static/img/first/first-horizontal-acro-light.png")}
                alt="FIRST logo and acronym"
                className="dark:hidden"
              />
              <IdealImage
                img={require("../../static/img/first/first-horizontal-acro-dark.png")}
                alt="FIRST logo and acronym"
                className="hidden dark:block"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 items-center">
              <div className="flex-grow md:mr-12 flex flex-col space-y-4">
                <div className="rounded-3xl flex flex-col space-y-4">
                  <Title order={4} className="text-xl font-black md:text-left">
                    Who is FIRST?
                  </Title>
                  <div>
                    All of our programs are members of a global organization
                    called FIRST. FIRST's mission is to inspire young people to
                    become leaders in science and technology fields by teaching
                    real-world skills through team work and competition. Each
                    year, a new challenge is presented to teams who, with the
                    help of experienced mentors, must apply their skills to
                    build a functional robot. Once built, the robot is put to
                    the test in a competition setting against teams from around
                    the world.
                  </div>
                  <Link to="https://www.firstinspires.org/" className="ml-auto">
                    <Button
                      rightIcon={<IconExternalLink />}
                      color={
                        colorScheme === "dark" ? "brand-yellow" : "brand-blue"
                      }
                      variant="subtle"
                      compact
                    >
                      FIRST
                    </Button>
                  </Link>
                </div>

                <Divider />

                <div className="rounded-3xl space-y-4 flex flex-col">
                  <Title
                    order={4}
                    className="text-xl font-black text-center md:text-left"
                  >
                    More Than Robots
                  </Title>
                  <div>
                    Although the goal is to build a robot, you do not have to be
                    an engineer. Whether you are an future rocket scientist or
                    an aspiring artist, there is a place here for you and
                    mentors ready to use their real world experience to help you
                    grow.
                  </div>
                  <Link
                    to="https://info.firstinspires.org/morethanrobots"
                    className="ml-auto"
                  >
                    <Button
                      rightIcon={<IconExternalLink />}
                      color={
                        colorScheme === "dark" ? "brand-yellow" : "brand-blue"
                      }
                      variant="subtle"
                      compact
                    >
                      More Than Robots
                    </Button>
                  </Link>
                </div>
              </div>

              <IdealImage
                img={require("../../static/img/morethanrobots.jpg")}
                alt="Collage of photos capturing some of the many ways students can get involved"
                className="overflow-hidden rounded-3xl"
              />
            </div>
          </div>
        </div>

        {/* Why join cards */}
        <Section title="Why join?">
          <Grid gutter="md" justify="center">
            {whyJoin.map((wj) => (
              <Grid.Col lg={6} xl={4} key={wj.title}>
                <FeatureCard key={wj.title} {...wj} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        <div className="space-y-4 bg-zinc-200 dark:bg-dark shadow-inner my-8 py-8">
          <div className="md:max-w-screen-xl mx-auto px-10 md:px-12">
            <div className="md:w-[500px] mb-8 mx-auto">
              <IdealImage
                img={require("../../static/img/open-house-banner.png")}
                alt="South Central STEM Collective open house banner"
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-x-0 space-y-6">
              <div className="flex-1">
                <Title
                  order={3}
                  className="text-2xl font-black text-center mb-6"
                >
                  Workspace and Directions
                </Title>
                <div>
                  We are located in the Chambersburg Mall, off Black Gap Road.
                  Getting to our unit from outside the mall can be slightly
                  tricky, so please refer to the following directions and map.
                </div>
                <ol className="mb-6">
                  <li>
                    Access the mall property using the "secondary" mall entrance
                    near the Dollar General{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      style={{ width: "1.5rem" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="red"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="white"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </li>
                  <li>
                    Drive straight into the parking lot, on the left side of the
                    divider (Yellow area).
                  </li>
                  <li>
                    Our entrance is right beside a glass door. Note the image
                    attached to the SC2 Bulb marker.{" "}
                    <img
                      src="/img/svg/logo-color.svg"
                      className="w-8 h-8 top-2 -mt-2 relative"
                    />
                  </li>
                </ol>

                <div className="italic text-center">
                  Click on the map icons for details. Our door will have the SC2
                  Bulb on the outside.
                </div>

                <iframe
                  src="https://www.google.com/maps/d/u/3/embed?mid=13WVDjSSoL7v92mAoV62t397_pQCGncny&ehbc=2E312F"
                  width="100%"
                  height="750"
                ></iframe>
              </div>

              <Divider
                size="sm"
                orientation="vertical"
                className="hidden md:block"
              />

              <Divider size="sm" className="md:hidden block" />

              <div className="flex-1">
                <Title order={3} className="text-2xl font-black text-center">
                  FAQ
                </Title>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
