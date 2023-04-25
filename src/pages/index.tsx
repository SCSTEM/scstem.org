import Link from "@docusaurus/Link";
import {
  Grid,
  Title,
  Text,
  useMantineTheme,
  Divider,
  clsx,
} from "@mantine/core";
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
import IdealImage from "@theme/IdealImage";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

import FeatureCard, {
  FeatureCardProps,
} from "@site/src/components/FeatureCard";
import HeroHeader from "@site/src/components/HeroHeader";
import { Button } from "@site/src/components/inputs/Button";
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
    img: {
      src: require("../idealimage/unsplash/lego-robots.jpg"),
      alt: "Lego® robots",
    },
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
    img: {
      src: require("../idealimage/ftc-robot.jpg"),
      alt: `Team 18035 "Reconnecting"'s robot`,
    },
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
    img: {
      src: require("../idealimage/frc-driveteam.jpg"),
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
      src: require("../idealimage/competition-1.jpg"),
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
      src: require("../idealimage/award.jpg"),
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
      src: require("../idealimage/dean.jpg"),
      alt: "Team members sharing a moment with Dean Kamen, the founder of FIRST®",
      placement: "bottom",
    },
  },
];

export default function Home(): JSX.Element {
  const { colorScheme } = useMantineTheme();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <DefaultLayout
      title="Home"
      description="The South Central STEM Collective is a non-profit organization focused on building the future of STEM, right here in Franklin County, Pennsylvania."
    >
      <HeroHeader img="/img/legos.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-4xl font-bold md:text-5xl">
            <span className="text-yellow">Robots</span> are in Franklin County.{" "}
            <div className="border-brand-yellow-5 border-b-4 border-0 border-solid w-fit">
              So are we.
            </div>
          </div>
          <div className="text-2xl">
            The South Central STEM Collective is a non-profit organization
            focused on building the future of STEM, right here in Franklin
            County, Pennsylvania.
          </div>
        </div>
      </HeroHeader>

      <div className="border-0 border-t-2 border-solid border-black border-opacity-20 dark:border-yellow dark:border-opacity-10">
        {/* Overview */}
        <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-xl px-6 mt-8">
          <Title align="center" className="md:text-2xl font-black text-xl">
            Science, Technology, Engineering, Math, Business, Art, and more
          </Title>
          <Text
            color={colorScheme === "dark" ? "dimmed" : null}
            size="lg"
            className="max-w-5xl m-auto"
            align="center"
          >
            <p>
              The South Central STEM Collective (otherwise known as SC2) was
              created to serve South Central Pennsylvania as "STEM Central";
              inspiring youth aged 9-18 with hands-on education, competitive
              robotics teams, and community outreach. With three rapidly growing
              programs and a team of experienced volunteer mentors, SC2 is the
              perfect place for students to learn real world skills in a fun and
              competitive atmosphere.
            </p>
          </Text>
        </div>

        {/* Programs */}
        <Section title="Our Programs">
          <Grid gutter="md" justify="center">
            {programs.map((program) => (
              <Grid.Col md={6} lg={4} key={program.key}>
                <FeatureCard key={program.key} {...program} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        {/* FIRST */}
        <AltSection>
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
                <Title order={4} className="text-xl font-black md:text-left">
                  Who is <span className="italic">FIRST®</span>?
                </Title>
                <div>
                  All of our programs are members of a global organization
                  called <span className="italic">FIRST®</span>. The mission of{" "}
                  <span className="italic">FIRST®</span> is to inspire young
                  people to become leaders in science and technology fields by
                  teaching real-world skills through team work and competition.
                  Each year, a new challenge is presented to teams who, with the
                  help of experienced mentors, must apply their skills to build
                  a functional robot. Once built, the robot is put to the test
                  in a competition setting against teams from around the world.
                </div>
                <div className="ml-auto">
                  <Button
                    to="https://www.firstinspires.org/"
                    rightIcon={<IconExternalLink />}
                    color={
                      colorScheme === "dark" ? "brand-yellow" : "brand-blue"
                    }
                    variant="subtle"
                    compact
                  >
                    <span className="italic">FIRST®</span>
                  </Button>
                </div>
              </div>

              <Divider
                color={colorScheme === "dark" ? "brand-gray" : "brand-dark"}
              />

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
                <div className="ml-auto">
                  <Button
                    rightIcon={<IconExternalLink />}
                    color={
                      colorScheme === "dark" ? "brand-yellow" : "brand-blue"
                    }
                    variant="subtle"
                    compact
                    to="https://info.firstinspires.org/morethanrobots"
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
        </AltSection>

        {/* Why Join */}
        <Section title="Why join?">
          <Grid gutter="md" justify="center">
            {whyJoin.map((wj) => (
              <Grid.Col md={6} lg={4} key={wj.key}>
                <FeatureCard {...wj} />
              </Grid.Col>
            ))}
          </Grid>
        </Section>

        {/* Video */}
        <div className="my-10 bg-zinc-200 dark:bg-black">
          <div className="aspect-video my-10 dark:border-yellow border-blue border-8 border-solid xl:max-w-6xl xl:mx-auto">
            <div
              className={clsx(
                "absolute dark:bg-yellow bg-blue mx-auto w-full md:w-fit left-0 right-0 text-center text-white dark:text-black pb-2 md:pb-1 md:text-2xl md:rounded-b-lg md:px-2 font-semibold transition-opacity duration-200",
                videoReady ? "opacity-0" : "opacity-100"
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
        </div>

        <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-xl px-6 my-24">
          <Title align="center" className="md:text-2xl font-black text-xl">
            Ready to join or find out more? Contact us!
          </Title>
          <Text
            color={colorScheme === "dark" ? "dimmed" : null}
            size="lg"
            className="max-w-5xl m-auto"
            align="center"
          >
            We are always looking for new members, mentors, and sponsors! If you
            want to find out how you can get plugged in or are looking for more
            information, please reach out through our{" "}
            <Link to="/get-involved">Get Involved form</Link>.
          </Text>
        </div>

        {/*
        <HomeSection
          title={`What is the "South Central STEM Collective"?`}
          image="/img/svg/undraw/building.svg"
        >
          <p>
            The South Central STEM Collective (otherwise known as SC2) was
            created to serve South Central Pennsylvania as "
            <Highlight>STEM Central</Highlight>" to inspire youth aged K-12
            through hands-on education, competitive robotics and drone teams,
            maker spaces, and community outreach.
          </p>
          <p>
            To achieve this goal, the SC2 plans to offer a range of activities,
            resources, space, and industry expertise in addition to the
            following:
          </p>

          <ul>
            <li>
              Acquire and maintain a collaborative workspace for communal use by
              all groups and members.
            </li>
            <li>
              Foster a creative and collaborative environment for
              experimentation and development in technology.
            </li>
            <li>
              Provide STEM education and mentorship to youth in grades K-12 as
              it pertains to robotics, drones, and maker labs.
            </li>
            <li>
              Share technology developments and ideas with the world at large.
            </li>
          </ul>

          <div className="flex justify-center"></div>
        </HomeSection>

        <HomeSection
          title="The only thing missing is you!"
          image="/img/svg/undraw/high-five.svg"
          flipped
        >
          <p>
            Are you a <Highlight>student</Highlight> who wants to grow your
            skills in Science, Technology, Engineering, or Math? Do you have an
            interest in marketing, business, or leadership? Do you like
            photography or design?
          </p>
          <p>
            Are you an industry pro, educator, business person, or engineer? Do
            you have a special skill-set,{" "}
            <Highlight>enjoy working with students</Highlight>, or have a
            passion for non-profit management? Are you looking for an outlet
            where you can give back to the community or{" "}
            <Highlight>share your skills</Highlight> and experience?
          </p>
          <p>
            Do you <Highlight>own a business</Highlight>, have available funds
            you are looking to invest back into the community, or are looking
            for a local non-profit to support? Are you looking for a place to
            donate tools, equipment, computers, or other materials?
          </p>
          <p>
            If you answered <strong>yes</strong> to any of these questions, we
            definitely have a place for you. Click the button below to get
            plugged in, or feel free to{" "}
            <a href="/contact">reach out directly</a> if you have any specific
            questions.
          </p>
          <div className="flex justify-center">
            <BrandButton to="/get-involved" className="text-dark">
              Get Involved
            </BrandButton>
          </div>
        </HomeSection>
        */}
      </div>
    </DefaultLayout>
  );
}

const AltSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div className="space-y-4 bg-zinc-200 dark:bg-black shadow-inner p-8">
    <div className="md:max-w-screen-xl mx-auto md:px-12">{children}</div>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <div className="p-8 md:max-w-screen-xl mx-auto">
    <Title
      order={3}
      className="text-2xl font-black mb-6 text-center md:text-left"
    >
      {title}
    </Title>
    {children}
  </div>
);
