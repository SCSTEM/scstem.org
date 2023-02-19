import {
  Badge,
  Group,
  Title,
  Text,
  SimpleGrid,
  useMantineColorScheme,
  MantineColor,
  Grid,
} from "@mantine/core";
import {
  IconDeviceGamepad2,
  IconLego,
  IconPresentation,
  IconRobot,
  IconTool,
  IconBooks,
  IconMoodSmile,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

import FeatureCard, { FCProps } from "@site/src/components/FeatureCard";
import HeroHeader from "@site/src/components/HeroHeader";
import Highlight from "@site/src/components/Highlight";
import DefaultLayout from "@site/src/layouts/Default";

const programs: FCProps[] = [
  {
    title: "FIRST Lego League",
    description:
      "Ages 4-16. FLL introduces science, technology, engineering, and math (STEM) to children through fun, exciting hands-on learning. Participants gain real-world problem-solving experiences through a guided, global robotics program, helping today's students and teachers build a better future together.",
    Icon: IconLego,
    color: "brand-red",
    link: "https://www.firstinspires.org/robotics/fll",
  },
  {
    title: "FIRST Tech Challenge",
    description:
      "Ages 12-18. FTC students learn to think like engineers. Teams design, build, and code robots to compete in an alliance format against other teams. Robots are built from a reusable platform, powered by Android technology, and can be coded using a variety of levels of Java-based programming.",
    Icon: IconDeviceGamepad2,
    color: "brand-orange",
    link: "https://www.firstinspires.org/robotics/ftc",
  },
  {
    title: "FIRST Robotics Competition",
    description:
      "Ages 14-18. Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team “brand,” and advancing respect and appreciation for STEM within the local community.",
    Icon: IconRobot,
    color: "brand-blue",
    link: "https://www.firstinspires.org/robotics/frc",
  },
];

const whyJoin: FCProps[] = [
  {
    title: "Hard skills",
    description: "",
    Icon: IconTool,
  },
  {
    title: "Soft skills",
    description: "",
    Icon: IconPresentation,
  },
  {
    title: "Education",
    description: "",
    Icon: IconBooks,
  },
  {
    title: "Scholarships",
    description: "",
    Icon: IconBooks,
  },
  {
    title: "Fun",
    description: "",
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
  <div className="py-3 mb-4 px-8">
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
  const [badgeColor, setBadgeColor] = useState<MantineColor>("brand-dark");

  useEffect(() => {
    colorScheme === "dark"
      ? setBadgeColor("brand-yellow")
      : setBadgeColor("brand-blue");
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
      <div className="my-10 md:max-w-screen-xl mx-auto">
        <Group position="center">
          <Badge size="lg" color={badgeColor} variant="outline">
            Open to all ages
          </Badge>
        </Group>
        <Title
          order={2}
          align="center"
          className="md:text-3xl font-black text-xl mt-6 px-6"
        >
          Meet the teams, see the robots, and learn more about our programs.
        </Title>

        <Text
          color="dimmed"
          size="lg"
          className="max-w-4xl m-auto mt-6 px-6"
          align="center"
        >
          Join us for the South Central STEM Collective open house. Get a chance
          to speak with the students and mentors, get hands on with the robots,
          and learn more about the programs we offer.
        </Text>

        <Section title="Our Programs">
          <Grid gutter="md" justify="center">
            {programs.map((program) => (
              <Grid.Col md={6} lg={4} key={program.title}>
                <FeatureCard {...program} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        <Section title="Why join?">
          <Grid gutter="md" justify="center">
            {whyJoin.map((wj) => (
              <Grid.Col lg={6} xl={4} key={wj.title}>
                <FeatureCard key={wj.title} {...wj} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>
      </div>
    </DefaultLayout>
  );
}
