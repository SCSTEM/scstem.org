import { Link } from "@nextui-org/react";
import {
  IconDeviceGamepad2,
  IconLego,
  IconPresentation,
  IconTool,
  IconBooks,
  IconMoodSmile,
  IconExternalLink,
  IconCalendarEvent,
  IconBrandFacebook,
  IconRobotFace,
} from "@tabler/icons-react";

import { Image } from "@/components/Image";
import { VideoPlayer } from "@/components/VideoPlayer";
import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/cards/FeatureCard";
import HeroHeader from "@/components/page/HeroHeader";
import { Highlight } from "@/components/spans";

import awardImage from "@/image/award.webp";
import competition1Image from "@/image/competition-1.webp";
import deanImage from "@/image/dean.webp";
import firstHorizontalAcroDarkImage from "@/image/first/first-horizontal-acro-dark.png";
import firstHorizontalDarkImage from "@/image/first/first-horizontal-dark.png";
import frcImage from "@/image/frc-driveteam.webp";
import ftcImage from "@/image/ftc-robot.webp";
import handsOn2Image from "@/image/hands-on-2.webp";
import leadership1Image from "@/image/leadership-1.webp";
import fllImage from "@/image/lego-robots.webp";

const programCards: FeatureCardProps[] = [
  {
    title: (
      <>
        <span className="italic inline">FIRST®</span> LEGO® League
      </>
    ),
    body: "FLL introduces science, technology, engineering, and math (STEM) to children through fun, exciting hands-on learning. Participants gain real-world problem-solving experiences through a guided, global robotics program, helping today's students and teachers build a better future together.",
    icon: IconLego,
    color: "red",
    link: "/clubs/fll",
    badge: "Ages 9 - 16",
    img: {
      src: fllImage,
      alt: "Lego® robots",
    },
  },
  {
    title: (
      <>
        <span className="italic">FIRST®</span> Tech Challenge
      </>
    ),
    body: "FTC students learn to think like engineers. Teams design, build, and code robots to compete in an alliance format against other teams. Robots are built from a reusable platform, powered by Android technology, and can be coded using a variety of levels of Java-based programming.",
    icon: IconDeviceGamepad2,
    color: "orange",
    link: "/clubs/ftc",
    badge: "Ages 12 - 18",
    img: {
      src: ftcImage,
      alt: `Team 18035 "Reconnecting"'s robot`,
    },
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
    link: "/biohazard",
    badge: "Ages 14 - 18",
    img: {
      src: frcImage,
      alt: `Team 4050 Biohazard's drive team and robot`,
    },
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

const faq: { question: string; answer: string | JSX.Element }[] = [
  {
    question: "When is the open house?",
    answer:
      "Thursday, May 16 from 7PM to 8:30 and Saturday, May 18 from 12PM to 3",
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
        Yes! You can fill out our <Link href="/get-involved">Get Involved</Link>{" "}
        form with your information and we will reach out. There&apos;s a good
        chance we have a meeting coming up you&apos;re welcome to visit!
      </>
    ),
  },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <div className="p-8 md:max-w-screen-lg mx-auto">
    <h3 className="text-2xl font-black mb-6 text-center md:text-left">
      {title}
    </h3>
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
  <div className="flex flex-col space-y-2 py-4">
    <div className="text-lg font-bold">{question}</div>
    <div>{answer}</div>
  </div>
);

export default function OpenHouse(): JSX.Element {
  return (
    <>
      <HeroHeader img="/image/students.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Want to know more about <Highlight>STEM</Highlight> and{" "}
            <Highlight>Robots</Highlight>?
          </div>
          <div className="text-2xl">
            Join us for our open house on{" "}
            <Highlight>Thursday, May 17 (7PM - 8:30)</Highlight> and{" "}
            <Highlight>Saturday, May 25 (12PM - 4)</Highlight> in downtown
            Chambersburg to see what we&apos;re all about.
          </div>
        </div>
      </HeroHeader>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-lg px-6 mt-8">
          <h2 className="md:text-3xl font-black text-xl text-center">
            Meet the teams, see the robots, and learn more about our programs.
          </h2>
          <div>
            Are you or is someone you know interested in LEGO®, science,
            technology, engineering, math, business, marketing, video
            production, software development, web design, carpentry, or
            leadership? Find out more and get a chance to speak with our
            students and mentors at our upcoming open house.
          </div>
        </div>

        <Section title="Our Programs">
          <div className="flex flex-wrap justify-center gap-5">
            {programCards.map((card, i) => (
              <div key={i}>
                <FeatureCard key={i} {...card} />
              </div>
            ))}
          </div>
        </Section>

        <div className="space-y-4 bg-zinc-200 dark:bg-black shadow-inner py-12 px-8">
          <div className="md:max-w-screen-lg mx-auto md:px-12">
            <div className="md:w-[750px] mb-8 mx-auto">
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
              <div className="grow md:mr-12 mb-12 md:mb-0 flex flex-col space-y-4 md:max-w-2xl">
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
                      rightSection={<IconExternalLink />}
                      color={colorScheme === "dark" ? "yellow" : "blue"}
                      variant="subtle"
                    >
                      <span className="italic">FIRST®</span>
                    </Button>
                  </Link>
                </div>

                <Divider color="dark" />

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
                      rightSection={<IconExternalLink />}
                      color={colorScheme === "dark" ? "yellow" : "blue"}
                      variant="subtle"
                    >
                      More Than Robots
                    </Button>
                  </Link>
                </div>
              </div>

              <IdealImage
                img={require("../idealimage/morethanrobots.jpg")}
                alt="Collage of photos capturing some of the many ways students can get involved"
                className="overflow-hidden rounded-3xl max-w-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why join cards */}
        <Section title="Why join?">
          <Grid gutter="md" justify="center">
            {whyJoin.map((wj) => (
              <Grid.Col key={wj.key}>
                <FeatureCard {...wj} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        <div className="space-y-4 bg-zinc-200 dark:bg-black shadow-inner py-8">
          <div className="md:max-w-screen-lg mx-auto px-10 md:px-12">
            <div className="md:w-[700px] mb-10 mx-auto">
              <IdealImage
                img={require("../idealimage/open-house-banner.png")}
                alt="South Central STEM Collective open house banner"
                className="mb-8"
              />
              <Card
                shadow="lg"
                radioGroup="md"
                p="xl"
                radius="lg"
                withBorder
                className="flex flex-col md:space-x-4 md:space-y-0 space-y-4 overflow-visible w-fit mx-auto"
              >
                <div>
                  <Title order={4} className="text-center">
                    Connect on Facebook
                  </Title>
                  <div className="space-y-4 items-center justify-center flex flex-col md:h-40 my-auto">
                    <Link to="https://fb.me/e/2pbNhQ4Y7">
                      <Button
                        leftSection={<IconCalendarEvent />}
                        styles={(theme) => ({
                          root: {
                            backgroundColor: "#F3425F",
                            border: 0,
                            height: rem(42),
                            paddingLeft: rem(20),
                            paddingRight: rem(20),
                            // TODO: Fix
                            // "&:not([data-disabled])": theme.fn.hover({
                            //   backgroundColor: theme.fn.darken("#F3425F", 0.05),
                            // }),
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
                        leftSection={<IconBrandFacebook />}
                        styles={(theme) => ({
                          root: {
                            backgroundColor: "#2374E1",
                            border: 0,
                            height: rem(42),
                            paddingLeft: rem(20),
                            paddingRight: rem(20),
                            // TODO: Fix
                            // "&:not([data-disabled])": theme.fn.hover({
                            //   backgroundColor: theme.fn.darken("#2374E1", 0.05),
                            // }),
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
                      className="size-8 top-2 -mt-2 relative"
                      alt="SC2 logo"
                    />
                  </li>
                </ol>

                <div className="italic text-center mb-2">
                  Click on the map icons for details. Our door will have the SC2
                  Bulb on the outside.
                </div>

                <iframe
                  src="https://www.google.com/maps/d/u/3/embed?mid=13WVDjSSoL7v92mAoV62t397_pQCGncny&ehbc=2E312F"
                  title="Google map of how to get to our workspace"
                  width="100%"
                  height="500"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <VideoPlayer
          url="https://youtu.be/147CgudTur8"
          placeholder="/image/morethanrobots.webp"
        />
      </div>
    </>
  );
}
