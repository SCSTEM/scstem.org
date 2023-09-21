import {
  Accordion,
  Card,
  Grid,
  MantineColor,
  Overlay,
  SimpleGrid,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconAward,
  IconChevronDown,
  IconDeviceGamepad2,
  IconEngine,
  IconHandGrab,
  IconMoodHappy,
  IconPlayerPlayFilled,
  IconRobot,
  IconTool,
  TablerIconsProps,
} from "@tabler/icons-react";
import { IconUsersGroup } from "@tabler/icons-react";
import { clsx } from "clsx";
import { FC, ReactNode } from "react";
import ReactPlayer from "react-player/lazy";
import { ParallaxBanner } from "react-scroll-parallax";

import breakpoints from "@site/breakpoints.config.cjs";
import Scroller from "@site/src/components/ImageScroller";
import { BrandButton } from "@site/src/components/inputs/Button";
import Underline from "@site/src/components/spans/Underline";
import DefaultLayout from "@site/src/layouts/Default";

import classes from "./index.module.css";

export default function BiohazardHome(): JSX.Element {
  const maxSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const minXl = useMediaQuery(`(min-width: ${breakpoints.xl})`);

  return (
    <DefaultLayout
      title="Biohazard Robotics"
      description="FRC Team 4050: Biohazard. Competitive high-school robotics team."
    >
      <header className="relative h-[calc(101vh-var(--ifm-navbar-height))] w-full text-white shadow-2xl">
        <div className="absolute -z-0 h-full w-full">
          <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)" />
          <video
            className="object-cover"
            width="100%"
            height="100%"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/img/biohazard/home-video.webm" type="video/webm" />
            <source src="/img/biohazard/home-video.mp4" type="video/mp4" />
            <img src="/img/biohazard/home-image.webp" />
          </video>
        </div>
        <div className="relative flex h-full flex-col w-full md:w-[750px] lg:w-[1000px] mx-auto text-center">
          <img className="lg:mt-20 mt-2" src="/img/biohazard/header-logo.svg" />
          <div className="mx-5 space-y-4 lg:space-y-10 mb-4 sm:p-8">
            <Title
              order={1}
              className="text-xl sm:text-3xl lg:text-4xl sm:!leading-[3rem]"
            >
              Welcome to the{" "}
              <Underline color="brand-green">next generation</Underline> of
              thinkers, engineers scientists, artists, and dreamers.
            </Title>
            <Title
              className="font-sans sm:text-2xl lg:text-3xl text-lg"
              order={2}
            >
              Inspiring students since <span className="text-green">2012</span>,
              Biohazard is south-central Pennsylvania's premiere high-school
              robotics team and we need you to take us to the{" "}
              <span className="text-green">next level</span>.
            </Title>
          </div>
          <button
            className="mx-auto flex cursor-pointer flex-col items-center border-none bg-transparent sm:text-2xl font-bold outline-none text-green mt-auto mb-20 lg:mb-10"
            onClick={() =>
              document
                .getElementById("scrollhere")
                .scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Find out how
            <IconChevronDown
              size={maxSm ? 50 : 75}
              stroke={1.5}
              className="animate-bounce mt-1"
            />
          </button>
        </div>
        <div id="scrollhere" className="mb-10"></div>
      </header>

      <main className={classes.background}>
        <div className="absolute w-full h-full -z-20 bg-[url('/img/biohazard/circuit-board.svg')]" />
        <div className="space-y-20 md:space-y-28 py-16">
          <PageSection className="space-y-16 md:space-y-24">
            <TeamOverview />
            <StatsGroup />
          </PageSection>
          <ParallaxBanner
            className="h-[400px] lg:h-[600px]"
            layers={[
              {
                image: "/img/biohazard/2023-robot-field.webp",
                speed: -15,
              },
              {
                speed: -15,
                children: (
                  <div className="absolute top-[150px] md:top-[200px] lg:top-[200px] w-full">
                    <div className="rounded-lg md:ml-10 mx-4 shadow-xl text-white p-4 w-[200px] sm:max-w-sm sm:w-fit from-brand-green-3 via-brand-green-4 to-brand-green-7 space-y-2 text-center">
                      <img
                        src="/img/biohazard/viper-logo.webp"
                        className="aspect-square"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
          {minXl ? (
            <PageSection>
              <ViperProfile />
            </PageSection>
          ) : null}
          <PageSection className="lg:!mt-10">
            <div className="aspect-video md:m-20 rounded-md p-2 bg-gradient-to-br from-brand-green-3 to-brand-green-8 shadow-2xl">
              <ReactPlayer
                className="-z-10 bg-white dark:bg-black"
                url="https://youtu.be/147CgudTur8"
                controls
                light="/img/doc-thumb.webp"
                volume={0.4}
                width="100%"
                height="100%"
                playIcon={
                  <IconPlayerPlayFilled className="text-green md:w-28 md:h-28 w-16 h-16" />
                }
              />
            </div>
          </PageSection>
        </div>
      </main>
    </DefaultLayout>
  );
}

// TODO: The styles for this profile component are kinda a mess and don't really work that well on mobile
// Need to redo this component at some point in the future
function ViperProfile() {
  const { colorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();
  const maxSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const maxLg = useMediaQuery(`(max-width: ${breakpoints.xl})`);

  const features: {
    title: string;
    description: ReactNode;
    icon: FC<TablerIconsProps>;
    color?: MantineColor;
  }[] = [
    {
      title: "Drivetrain",
      description:
        "Viper's drivetrain uses 4 mecanum wheels for rapid forward, backward, left, and right motion powered by 4 Vex Falcon 500 motors.",
      icon: IconEngine,
      color: "brand-blue",
    },
    {
      title: "Manipulator",
      description:
        "The claw is made of 3D printed parts using pneumatic cylinders to open and close. The fingers are mounted on a 3D printed, rotating wrist.",
      icon: IconHandGrab,
      color: "brand-red",
    },
    {
      title: "Controls",
      description:
        "Viper is operated by primary and secondary drivers using Xbox controllers. The primary controls the drivetrain while the secondary controls the manipulator.",
      icon: IconDeviceGamepad2,
      color: "grape",
    },
    {
      title: "Winning",
      description: (
        <>
          Biohazard and Viper won the 2023 Greater Pittsburgh Regional{" "}
          <i>Industrial Design Award</i> due to their selection of material
          types and complex assemblies.
        </>
      ),
      icon: IconAward,
      color: "brand-yellow",
    },
  ];

  return (
    <div className="my-10 lg:my-0 sm:mx-10 mx-1 relative h-[500px] sm:h-[750px] lg:h-full">
      <div className="bg-gradient-to-br from-brand-gray-3 to-brand-gray-8 absolute h-full sm:h-[850px] lg:h-[550px] w-full -z-10 rounded-2xl shadow-2xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-slate-600 border-solid border-[1px]" />
      <div className="flex lg:flex-row flex-col mx-5">
        <Card
          className="flex-1 -mt-12 sm:-mt-32 lg:mt-0 mb-6 sm:my-4 -ml-10 mr-3 sm:mx-8 sm:p-8 sm:pl-6 p-4 pl-2 h-fit"
          shadow="xl"
          radius="lg"
          bg={colorScheme === "dark" ? undefined : colors["brand-green"][6]}
          withBorder
        >
          <div className="font-heading text-3xl md:text-5xl font-black italic dark:text-green text-white">
            Viper
          </div>
          {/* The maxLg case is functionally useless until this component is perfected for mobile */}
          {maxLg ? (
            <Accordion className="mt-2" defaultValue={features[0].title}>
              {features.map((feature, i) => (
                <Accordion.Item
                  key={i}
                  value={feature.title}
                  className="[&:is(:last-child)]:border-b-0"
                >
                  <Accordion.Control
                    className="dark:text-green text-white"
                    color={`#${colors[feature.color][5]}`}
                  >
                    <div className="flex items-center space-x-2">
                      <feature.icon size={rem(36)} stroke={1.5} />
                      <div className="w-full font-heading">{feature.title}</div>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel className="text-brand-gray-0 text-sm">
                    {feature.description}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <div className="mt-4 sm:mt-10 ml-1 sm:ml-2 grid lg:grid-cols-2 grid-cols-1 sm:grid-cols-4 gap-y-6 sm:gap-y-10 gap-x-10">
              {features.map((feature, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex dark:text-green text-white space-x-2 pr-4">
                    <feature.icon
                      size={maxSm ? rem(30) : rem(36)}
                      stroke={1.5}
                    />
                    <div className="w-full border-b-2 border-solid border-0 sm:text-xl font-heading">
                      {feature.title}
                    </div>
                  </div>
                  <div className="text-zinc-50 text-sm sm:text-base">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <div className="sm:max-w-xl lg:py-24 px-5 mx-auto">
          <Scroller
            delay={5000}
            images={[
              "/img/biohazard/renders/2023-robot-render-1.webp",
              "/img/biohazard/renders/2023-robot-render-2.webp",
              "/img/biohazard/renders/2023-robot-render-3.webp",
              "/img/biohazard/renders/2023-robot-render-4.webp",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                className="object-contain h-[200px] md:h-full my-auto"
              />
            ))}
          />
        </div>
      </div>
    </div>
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

function TeamOverview() {
  const items: {
    icon: FC<TablerIconsProps>;
    title: ReactNode;
    description: ReactNode;
  }[] = [
    {
      icon: IconRobot,
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

  return (
    <div className="p-5">
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title
            className="text-3xl font-black mb-2 text-black dark:text-white font-sans"
            order={2}
          >
            Join the Biohazard revolution and prepare for the hardest fun you'll
            ever have.
          </Title>
          <Text c="dimmed">
            <i>FIRST®</i> Robotics Competition (FRC) is a "Sport for the Mind"
            where creativity, determination, and teamwork are the keys to
            success as we compete with teams from around the world.
          </Text>

          <BrandButton
            size="lg"
            radius="md"
            mt="xl"
            to="/get-involved"
            className="shadow-lg"
          >
            Join the Revolution
          </BrandButton>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items.map((item, i) => (
              <div key={i}>
                <ThemeIcon
                  size={44}
                  radius="md"
                  className="bg-gradient-to-br from-brand-green-3 via-brand-green-4 to-brand-green-7 shadow-md border-none"
                >
                  <item.icon size={rem(26)} stroke={1.5} />
                </ThemeIcon>
                <Text fz="lg" mt="sm" fw={500}>
                  {item.title}
                </Text>
                <Text c="dimmed" fz="sm">
                  {item.description}
                </Text>
              </div>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}

function StatsGroup() {
  const stats = [
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

  return (
    <div className="flex sm:p-5 sm:px-0 px-5 py-0 rounded-lg flex-col sm:flex-row bg-gradient-to-br from-brand-gray-3 to-brand-gray-8 shadow-2xl divide-solid divide-x-0 sm:divide-x-2 sm:divide-y-0 divide-y-2 divide-white">
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
  );
}
