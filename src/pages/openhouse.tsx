import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import {
  Title,
  Text,
  useMantineColorScheme,
  MantineColor,
  Grid,
  Button,
  Divider,
  Card,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconDeviceGamepad2,
  IconLego,
  IconPresentation,
  IconRobot,
  IconTool,
  IconBooks,
  IconMoodSmile,
  IconExternalLink,
  IconCalendarEvent,
  IconBrandFacebook,
} from "@tabler/icons-react";
import IdealImage from "@theme/IdealImage";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import React, { useEffect, useState } from "react";

import CustomButton from "@site/src/components/Button";
import FeatureCard, {
  FeatureCardProps,
} from "@site/src/components/FeatureCard";
import HeroHeader from "@site/src/components/HeroHeader";
import Highlight from "@site/src/components/Highlight";
import DefaultLayout from "@site/src/layouts/Default";

const programs: FeatureCardProps[] = [
  {
    key: "fll",
    title: (
      <Text size="lg" weight={700}>
        <span className="italic inline">FIRST®</span> LEGO® League
      </Text>
    ),
    body: "FLL introduces science, technology, engineering, and math (STEM) to children through fun, exciting hands-on learning. Participants gain real-world problem-solving experiences through a guided, global robotics program, helping today's students and teachers build a better future together.",
    Icon: IconLego,
    color: "brand-red",
    link: "https://www.firstinspires.org/robotics/fll",
    badge: "Ages 9 - 16",
  },
  {
    key: "ftc",
    title: (
      <Text size="lg" weight={700}>
        <span className="italic">FIRST®</span> Tech Challenge
      </Text>
    ),
    body: "FTC students learn to think like engineers. Teams design, build, and code robots to compete in an alliance format against other teams. Robots are built from a reusable platform, powered by Android technology, and can be coded using a variety of levels of Java-based programming.",
    Icon: IconDeviceGamepad2,
    color: "brand-orange",
    link: "https://www.firstinspires.org/robotics/ftc",
    badge: "Ages 12 - 18",
  },
  {
    key: "frc",
    title: (
      <Text size="lg" weight={700}>
        <span className="italic">FIRST®</span> Robotics Competition
      </Text>
    ),
    body: "Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team “brand,” and advancing respect and appreciation for STEM within the local community.",
    Icon: IconRobot,
    color: "brand-blue",
    link: "https://www.firstinspires.org/robotics/frc",
    badge: "Ages 14 - 18",
  },
];

const whyJoin: FeatureCardProps[] = [
  {
    key: "skills",
    title: "Learn real-world skills",
    body: (
      <div className="flex flex-col h-full">
        <div className="mb-3">
          Get hands on with tools and technology under the supervision of
          experts in their fields in everything from engineering to marketing.
          Learn not only how the tools work, but how to use them effectively.
        </div>
        <IdealImage
          img={require("../idealimage/hands-on-2.jpg")}
          alt="A student and mentor get hands-on with a robot"
          className="overflow-hidden rounded-xl shadow-xl aspect-video mt-auto"
        />
      </div>
    ),
    Icon: IconTool,
  },
  {
    key: "leadership",
    title: "Experience leadership and teamwork",
    body: (
      <div className="flex flex-col h-full">
        <div className="mb-3">
          Build strong relationships with teammates and mentors as you work
          together throughout the season. Learn how to make decisions as a team
          and take leadership in your area of expertise.
        </div>
        <IdealImage
          img={require("../idealimage/leadership-1.jpg")}
          alt="Two students referencing a whiteboard during a planning meeting"
          className="overflow-hidden rounded-xl shadow-xl mt-auto aspect-video"
        />
      </div>
    ),
    Icon: IconPresentation,
  },
  {
    key: "competition",
    title: "Education through competition",
    body: (
      <div className="flex flex-col h-full">
        <div className="mb-3">
          Prepare to compete against teams from around the world with a limited
          time-frame, tight budget, and a complex challenge. Learn how to work
          under pressure and build reliable systems that can handle intense
          competition.
        </div>
        <IdealImage
          img={require("../idealimage/competition-1.jpg")}
          alt="Team members cheering at competition"
          className="overflow-hidden rounded-xl shadow-xl mt-auto aspect-video"
        />
      </div>
    ),
    Icon: IconBooks,
  },
  {
    key: "scholarships",
    title: "Scholarships and career opportunities",
    body: (
      <div className="flex flex-col h-full">
        <div className="mb-3">
          Being a member of a <span className="italic">FIRST®</span> team is
          more than just building robots and learning about STEM. It opens doors
          to scholarship and career opportunities that you cannot get anywhere
          else. Many of our alumni used the skills developed while students to
          pursue careers in STEM (and related) fields.
        </div>
        <IdealImage
          img={require("../idealimage/award.jpg")}
          alt="Team members receiving an award at competition"
          className="overflow-hidden rounded-xl shadow-xl mt-auto aspect-video"
        />
      </div>
    ),
    Icon: IconBooks,
  },
  {
    key: "fun",
    title: "Fun",
    body: (
      <div className="flex flex-col h-full">
        <div className="mb-3">
          Although we take our work seriously, we also have a lot of fun.
          Whether it's dancing to the YMCA at competition, playing a game of
          Kahoot during a meeting, or just hanging out with friends as we work
          on our robots, we always manage to have a lot of fun.
        </div>
        <IdealImage
          img={require("../idealimage/dean.jpg")}
          alt="Team members sharing a moment with Dean Kamen, the founder of FIRST®"
          className="overflow-hidden rounded-xl shadow-xl mt-auto aspect-video"
        />
      </div>
    ),
    Icon: IconMoodSmile,
  },
];

const faq: { question: string; answer: string | JSX.Element }[] = [
  {
    question: "When is the open house?",
    answer:
      "Thursday, March 23 from 7PM to 8:30 and Saturday, March 25 from 10AM to 11:30 or 1PM to 3",
  },
  {
    question: "What age do I have to be to join?",
    answer:
      "We have 3 primary age groups, with ages 9 to 18. We are also always looking for adult mentors willing to share their skills with our students.",
  },
  {
    question: "What does it cost to participate?",
    answer:
      "Membership dues or registration fees are up to the individual teams depending on age group, but most are free or very inexpensive.",
  },
  {
    question: "What if I don't know anything about robotics?",
    answer:
      "That's okay! We have a wide range of experience levels and are always looking for new members to join any of our teams. We will teach you everything you need to know.",
  },
  {
    question:
      "I can't make it to the open house, is there another time I can visit or learn about what you do?",
    answer: (
      <>
        Yes! You can fill out our <Link to="/get-involved">Get Involved</Link>{" "}
        form with your information and we will reach out. There's a good chance
        we have a meeting coming up you're welcome to visit!
      </>
    ),
  },
];

const videoUrl = "";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <div className="py-2 px-8 md:max-w-screen-xl mx-auto">
    <Title
      order={3}
      className="text-2xl font-black mb-6 text-center md:text-left"
    >
      {title}
    </Title>
    {children}
  </div>
);

const QA = ({
  question,
  answer,
}: {
  question: string;
  answer: string | JSX.Element;
}): JSX.Element => (
  <div className="flex flex-col space-y-2 mb-4">
    <div className="text-lg font-bold">{question}</div>
    <div>{answer}</div>
  </div>
);

export default function OpenHouse(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const [color, setColor] = useState<MantineColor>("brand-dark");
  const mediaMd = useMediaQuery("(max-width: 992px)");

  useEffect(() => {
    colorScheme === "dark" ? setColor("brand-yellow") : setColor("brand-blue");
  }, [colorScheme]);

  return (
    <DefaultLayout title="Open House">
      <HeroHeader img="/img/students.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Want to know more about <Highlight theme="dark">STEM</Highlight> and{" "}
            <Highlight theme="dark">Robots</Highlight>?
          </div>
          <div className="text-2xl">
            Join us for our open house on{" "}
            <Highlight theme="dark">Thursday, March 23 (7PM - 8:30)</Highlight>{" "}
            and{" "}
            <Highlight theme="dark">
              Saturday, March 25 (10AM - 11:30 and 1PM - 3)
            </Highlight>{" "}
            at the Chambersburg Mall to see what we're all about.
          </div>
        </div>
      </HeroHeader>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-xl px-6 mt-8">
          <Title
            order={2}
            align="center"
            className="md:text-3xl font-black text-xl"
          >
            Meet the teams, see the robots, and learn more about our programs.
          </Title>
          <Text
            color={colorScheme === "dark" ? "dimmed" : null}
            size="lg"
            className="max-w-4xl m-auto"
            align="center"
          >
            Are you or is someone you know interested in LEGO®, science,
            technology, engineering, math, business, marketing, video
            production, software development, web design, carpentry, or
            leadership? Find out more and get a chance to speak with our
            students and mentors at our upcoming open house.
          </Text>
        </div>

        <Section title="Our Programs">
          <Grid gutter="md" justify="center">
            {programs.map((program) => (
              <Grid.Col md={6} lg={4} key={program.key}>
                <FeatureCard key={program.key} {...program} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        <div className="space-y-4 bg-zinc-200 dark:bg-dark shadow-inner py-12 px-8">
          <div className="md:max-w-screen-xl mx-auto md:px-12">
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
              <div className="flex-grow md:mr-12 flex flex-col space-y-4">
                <div className="rounded-3xl flex flex-col space-y-4">
                  <Title order={4} className="text-xl font-black md:text-left">
                    Who is <span className="italic">FIRST®</span>?
                  </Title>
                  <div>
                    All of our programs are members of a global organization
                    called <span className="italic">FIRST®</span>. The mission
                    of <span className="italic">FIRST®</span> mission is to
                    inspire young people to become leaders in science and
                    technology fields by teaching real-world skills through team
                    work and competition. Each year, a new challenge is
                    presented to teams who, with the help of experienced
                    mentors, must apply their skills to build a functional
                    robot. Once built, the robot is put to the test in a
                    competition setting against teams from around the world.
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
                      <span className="italic">FIRST®</span>
                    </Button>
                  </Link>
                </div>

                <Divider color="brand-dark" />

                <div className="rounded-3xl space-y-4 flex flex-col">
                  <Title
                    order={4}
                    className="text-xl font-black text-center md:text-left"
                  >
                    More Than Robots
                  </Title>
                  <div>
                    Although the goal is to build a robot, you do not have to be
                    an engineer. Whether you are a future rocket scientist or an
                    aspiring artist, there is a place here for you and mentors
                    ready to use their real world experience to help you grow.
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
                img={require("../idealimage/morethanrobots.jpg")}
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
              <Grid.Col md={6} lg={4} key={wj.key}>
                <FeatureCard {...wj} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        <div className="space-y-4 bg-zinc-200 dark:bg-dark shadow-inner py-8">
          <div className="md:max-w-screen-xl mx-auto px-10 md:px-12">
            <div className="md:w-[700px] mb-8 mx-auto">
              <IdealImage
                img={require("../idealimage/open-house-banner.png")}
                alt="South Central STEM Collective open house banner"
                className="mb-4"
              />
              <Card
                shadow="lg"
                radioGroup="md"
                p="xl"
                radius="lg"
                withBorder
                className="flex space-x-4 overflow-visible"
              >
                <div className="flex-1">
                  <Title order={4} className="text-center mb-4">
                    Connect on Facebook
                  </Title>
                  <div className="space-y-4 items-center flex flex-col">
                    <Link to="https://fb.me/e/2pbNhQ4Y7">
                      <Button
                        leftIcon={<IconCalendarEvent />}
                        styles={(theme) => ({
                          root: {
                            backgroundColor: "#F3425F",
                            border: 0,
                            height: rem(42),
                            paddingLeft: rem(20),
                            paddingRight: rem(20),
                            "&:not([data-disabled])": theme.fn.hover({
                              backgroundColor: theme.fn.darken("#F3425F", 0.05),
                            }),
                            leftIcon: {
                              marginRight: theme.spacing.md,
                            },
                          },
                        })}
                      >
                        Let us know you're coming
                      </Button>
                    </Link>
                    <Link to="https://fb.me/e/2pbNhQ4Y7">
                      <Button
                        leftIcon={<IconBrandFacebook />}
                        styles={(theme) => ({
                          root: {
                            backgroundColor: "#2374E1",
                            border: 0,
                            height: rem(42),
                            paddingLeft: rem(20),
                            paddingRight: rem(20),
                            "&:not([data-disabled])": theme.fn.hover({
                              backgroundColor: theme.fn.darken("#2374E1", 0.05),
                            }),
                            leftIcon: {
                              marginRight: theme.spacing.md,
                            },
                          },
                        })}
                      >
                        Like SC2 on Facebook
                      </Button>
                    </Link>
                  </div>
                </div>

                <Divider size="sm" orientation="vertical" />

                <div className="flex-1 flex flex-col items-center">
                  <Title order={4} className="text-center mb-2">
                    Add to your calendar
                  </Title>
                  <AddToCalendarButton
                    name="South Central STEM Collective: Open House (Thursday)"
                    description="Get hands on with robots at the South Central STEM Collective robotics open house. Learn more at https://go.scstem.tech/openhouse23"
                    startDate="2023-03-23"
                    startTime="19:00"
                    endTime="20:30"
                    timeZone="America/New_York"
                    location="3055 Black Gap Rd, Chambersburg, PA 17202"
                    organizer="South Central STEM Collective|info@scstem.org"
                    icsFile="https://scstem.org/ics/0323-1900.ics"
                    subscribe
                    hideBranding
                    iCalFileName="robotics-open-house-0323-1900"
                    listStyle="overlay"
                    label="Thursday, 23rd @ 7PM"
                    lightMode={colorScheme === "light" ? "light" : "dark"}
                    options={[
                      "Google",
                      "Apple",
                      "Outlook.com",
                      "Yahoo",
                      "iCal",
                    ]}
                    styleDark="--btn-border: none; --btn-shadow: none;"
                    styleLight="--btn-shadow: none;"
                  ></AddToCalendarButton>
                  <AddToCalendarButton
                    name="South Central STEM Collective: Open House (Saturday Morning)"
                    description="Get hands on with robots at the South Central STEM Collective robotics open house. Learn more at https://go.scstem.tech/openhouse23"
                    startDate="2023-03-25"
                    startTime="10:00"
                    endTime="11:30"
                    timeZone="America/New_York"
                    location="3055 Black Gap Rd, Chambersburg, PA 17202"
                    organizer="South Central STEM Collective|info@scstem.org"
                    icsFile="https://scstem.org/ics/0325-1000.ics"
                    subscribe
                    hideBranding
                    iCalFileName="robotics-open-house-0325-1000"
                    listStyle="overlay"
                    label="Saturday, 25th @ 10AM"
                    lightMode={colorScheme === "light" ? "light" : "dark"}
                    options={[
                      "Google",
                      "Apple",
                      "Outlook.com",
                      "Yahoo",
                      "iCal",
                    ]}
                    styleDark="--btn-border: none; --btn-shadow: none;"
                    styleLight="--btn-shadow: none;"
                  ></AddToCalendarButton>
                  <AddToCalendarButton
                    name="South Central STEM Collective: Open House (Saturday Afternoon)"
                    description="Get hands on with robots at the South Central STEM Collective robotics open house. Learn more at https://go.scstem.tech/openhouse23"
                    startDate="2023-03-25"
                    startTime="13:00"
                    endTime="15:00"
                    timeZone="America/New_York"
                    location="3055 Black Gap Rd, Chambersburg, PA 17202"
                    organizer="South Central STEM Collective|info@scstem.org"
                    icsFile="https://scstem.org/ics/0325-1300.ics"
                    subscribe
                    hideBranding
                    iCalFileName="robotics-open-house-0325-1300"
                    listStyle="overlay"
                    label="Saturday, 25th @ 1PM"
                    lightMode={colorScheme === "light" ? "light" : "dark"}
                    options={[
                      "Google",
                      "Apple",
                      "Outlook.com",
                      "Yahoo",
                      "iCal",
                    ]}
                    styleDark="--btn-border: none; --btn-shadow: none;"
                    styleLight="--btn-shadow: none;"
                  ></AddToCalendarButton>
                </div>
              </Card>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-x-0 space-y-6">
              <div className="flex-1">
                <Title
                  order={3}
                  className="text-2xl font-black text-center mb-6"
                >
                  FAQ
                </Title>
                {faq.map((qa) => (
                  <QA
                    key={qa.question}
                    question={qa.question}
                    answer={qa.answer}
                  />
                ))}
              </div>

              <Divider
                size="sm"
                orientation={mediaMd ? "horizontal" : "vertical"}
              />

              <div className="flex-1">
                <Title
                  order={3}
                  className="text-2xl font-black text-center mb-6"
                >
                  Workspace and Directions
                </Title>
                <div>
                  We are located in the{" "}
                  <Link to="https://goo.gl/maps/7JxxTsU5dRnvkfLx7">
                    Chambersburg Mall, off Black Gap Road
                  </Link>
                  . Getting to our unit from outside the mall can be slightly
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

                <div className="italic text-center mb-2">
                  Click on the map icons for details. Our door will have the SC2
                  Bulb on the outside.
                </div>

                <iframe
                  src="https://www.google.com/maps/d/u/3/embed?mid=13WVDjSSoL7v92mAoV62t397_pQCGncny&ehbc=2E312F"
                  width="100%"
                  height="500"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {videoUrl ? (
          <Section title="Can't make it?">
            <Card shadow="lg" p="xl" radius="lg" withBorder className="w-full">
              <Title order={4} className="w-full text-center">
                Check out this video to learn a little bit more about our FRC
                team: Biohazard
              </Title>
              <div className="overflow-hidden rounded-2xl shadow-xl md:h-[500px] my-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="text-center">
                <CustomButton
                  to="/get-involved"
                  className="text-dark"
                  variant="gradient"
                  gradient={{ from: "brand-yellow", to: "brand-orange" }}
                >
                  Get Involved
                </CustomButton>
              </div>
            </Card>
          </Section>
        ) : null}
      </div>
    </DefaultLayout>
  );
}
