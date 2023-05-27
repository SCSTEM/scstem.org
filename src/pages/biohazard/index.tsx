import {
  Card,
  Col,
  Grid,
  Overlay,
  SimpleGrid,
  ThemeIcon,
  Title,
  clsx,
} from "@mantine/core";
import { Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconChevronDown,
  IconMoodHappy,
  IconPlayerPlayFilled,
  IconRobot,
  IconTool,
  TablerIconsProps,
} from "@tabler/icons-react";
import { IconUsersGroup } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import ReactPlayer from "react-player/lazy";
import { ParallaxBanner } from "react-scroll-parallax";

import Scroller from "@site/src/components/ImageScroller";
import { BrandButton } from "@site/src/components/inputs/Button";
import Underline from "@site/src/components/spans/Underline";
import DefaultLayout from "@site/src/layouts/Default";

import "./index.css";

export default function BiohazardHome(): JSX.Element {
  const isSmall = useMediaQuery("(max-width: 800px)");

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
        <div className="relative flex h-full flex-col w-full lg:w-[750px] xl:w-[1000px] mx-auto text-center">
          <img className="md:mt-28 my-2" src="/img/biohazard/header-logo.svg" />
          <div className="mx-5 space-y-4 md:space-y-10 mb-4 md:p-8">
            <Title
              order={1}
              className="text-xl md:text-4xl lg:text-4xl lg:!leading-[3rem]"
            >
              Welcome to the{" "}
              <Underline color="brand-green">next generation</Underline> of
              thinkers, engineers scientists, artists, and dreamers.
            </Title>
            <Title
              className="font-sans md:text-2xl xl:text-3xl text-lg"
              order={2}
            >
              Inspiring students since <span className="text-green">2012</span>,
              Biohazard is south-central Pennsylvania's premiere high-school
              robotics team and we need you to take us to the{" "}
              <span className="text-green">next level</span>.
            </Title>
          </div>
          <button
            className="mx-auto flex cursor-pointer flex-col items-center border-none bg-transparent md:text-2xl font-bold outline-none text-green mt-auto mb-20 lg:mb-10"
            onClick={() =>
              document
                .getElementById("scrollhere")
                .scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Find out how
            <IconChevronDown
              size={isSmall ? 50 : 75}
              stroke={1.5}
              className="animate-bounce mt-1"
            />
          </button>
        </div>
        <div id="scrollhere" className="mb-10"></div>
      </header>
      <main className="bg-gradient-to-r bio-background relative">
        <div className="absolute w-full h-full -z-20 bg-[url('/img/biohazard/circuit-board.svg')]" />
        <div className="space-y-20 lg:space-y-28 py-16">
          <PageSection className="space-y-16 lg:space-y-24">
            <TeamOverview />
            <StatsGroup />
          </PageSection>
          <ParallaxBanner
            className="h-[400px] xl:h-[600px]"
            layers={[
              {
                image: "/img/biohazard/2023-robot-field.webp",
                speed: -15,
              },
              {
                speed: -15,
                children: (
                  <div className="absolute top-[150px] lg:top-[200px] xl:top-[250px] w-full">
                    <div className="rounded-lg lg:ml-10 mx-4 shadow-xl text-white p-4 md:w-fit bg-gradient-to-br from-brand-green-3 via-brand-green-4 to-brand-green-7 space-y-2 text-center">
                      <div className="font-sans font-black text-2xl">
                        Biohazard's 2023 Robot:
                      </div>
                      <div className="font-heading text-5xl font-black italic">
                        Viper
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <PageSection>
            <div className="my-16 md:my-36 md:mx-10 relative h-[400px] md:h-full">
              <div className="bg-gradient-to-br from-brand-gray-3 to-brand-gray-8 absolute h-full md:h-[550px] w-full -z-10 rounded-2xl shadow-2xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-slate-600 border-solid border-[1px]" />
              <div className="flex md:flex-row flex-col mx-5">
                <Card
                  className="flex-1 -mt-10 mb-4 md:my-4 mx-8"
                  shadow="xl"
                  padding="lg"
                  radius="lg"
                  withBorder
                >
                  <div className="font-heading text-3xl lg:text-5xl font-black italic text-green">
                    Viper
                  </div>
                </Card>
                <div className="md:max-w-xl md:py-24 px-5">
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
                        className="object-contain h-[200px] lg:h-full my-auto"
                      />
                    ))}
                  />
                </div>
              </div>
            </div>
          </PageSection>
          <PageSection className="xl:!mt-10">
            <div className="aspect-video lg:m-20 rounded-md p-2 bg-gradient-to-br from-brand-green-3 to-brand-green-8 shadow-2xl">
              <ReactPlayer
                className="-z-10 bg-white dark:bg-black"
                url="https://youtu.be/147CgudTur8"
                controls
                light="/img/doc-thumb.webp"
                volume={0.4}
                width="100%"
                height="100%"
                playIcon={
                  <IconPlayerPlayFilled className="text-green lg:w-28 lg:h-28 w-16 h-16" />
                }
              />
            </div>
          </PageSection>
        </div>
      </main>
    </DefaultLayout>
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
    <section className={clsx("p-8 lg:max-w-screen-2xl mx-auto", className)}>
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
        <Col span={12} md={5}>
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
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
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
        </Col>
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
    <div className="flex md:p-5 md:px-0 px-5 py-0 rounded-lg flex-col md:flex-row bg-gradient-to-br from-brand-gray-3 to-brand-gray-8 shadow-2xl divide-solid divide-x-0 md:divide-x-2 md:divide-y-0 divide-y-2 divide-white">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex-1 md:pl-5 md:pb-0 pl-0 pb-5 pt-4 space-y-2 md:pr-8 text-white"
        >
          <div className="text-3xl font-bold font-heading">{stat.stats}</div>
          <div className="uppercase font-bold text-sm">{stat.title}</div>
          <div className="text-sm">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}
