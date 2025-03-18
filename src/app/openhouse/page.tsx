import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import {
  IconLego,
  IconCalendarEvent,
  IconBrandFacebook,
  IconRobotFace,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";
import { VideoPlayer } from "@/components/VideoPlayer";
import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/cards/FeatureCard";
import HeroHeader from "@/components/page/HeroHeader";
import Section from "@/components/page/Section";
import { Highlight } from "@/components/spans";

import frcImage from "@/image/frc-driveteam.webp";
import fllImage from "@/image/lego-robots.webp";
import openHouseImage from "@/image/open-house-24-banner.webp";

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

// const joinCards: FeatureCardProps[] = [
//   {
//     title: "Learn real-world skills",
//     body: (
//       <>
//         Get hands on with tools and technology under the supervision of experts
//         in their fields in everything from engineering to marketing. Learn not
//         only how the tools work, but how to use them effectively.
//       </>
//     ),
//     icon: IconTool,
//     img: {
//       src: handsOn2Image,
//       alt: "A student and mentor get hands-on with a robot",
//       placement: "bottom",
//     },
//   },
//   {
//     title: "Experience leadership and teamwork",
//     body: (
//       <>
//         Build strong relationships with teammates and mentors as you work
//         together throughout the season. Learn how to make decisions as a team
//         and take leadership in your area of expertise.
//       </>
//     ),
//     icon: IconPresentation,
//     img: {
//       src: leadership1Image,
//       alt: "Two students referencing a whiteboard during a planning meeting",
//       placement: "bottom",
//     },
//   },
//   {
//     title: "Education through competition",
//     body: (
//       <>
//         Prepare to compete against teams from around the world with a limited
//         time-frame, tight budget, and a complex challenge. Learn how to work
//         under pressure and build reliable systems that can handle intense
//         competition.
//       </>
//     ),
//     icon: IconBooks,
//     img: {
//       src: competition1Image,
//       alt: "Team members cheering at competition",
//       placement: "bottom",
//     },
//   },
//   {
//     title: "Scholarships and career opportunities",
//     body: (
//       <>
//         Being a member of a <span className="italic">FIRST®</span> team is more
//         than just building robots and learning about STEM. It opens doors to
//         scholarship and career opportunities that you cannot get anywhere else.
//         Many of our alumni used the skills developed while students to pursue
//         careers in STEM (and related) fields.
//       </>
//     ),
//     icon: IconBooks,
//     img: {
//       src: awardImage,
//       alt: "Team members receiving an award at competition",
//       placement: "bottom",
//     },
//   },
//   {
//     title: "Fun",
//     body: (
//       <>
//         Although we take our work seriously, we also have a lot of fun. Whether
//         it&apos;s dancing to the YMCA at competition, playing a game of Kahoot
//         during a meeting, or just hanging out with friends as we work on our
//         robots, we always manage to have a lot of fun.
//       </>
//     ),
//     icon: IconMoodSmile,
//     img: {
//       src: deanImage,
//       alt: "Team members sharing a moment with Dean Kamen, the founder of FIRST®",
//       placement: "bottom",
//     },
//   },
// ];

const faq: { question: string; answer: string | ReactNode }[] = [
  {
    question: "When is the open house?",
    answer:
      "Thursday, June 6 from 7PM to 8:30 and Saturday, June 8 from 9AM to 12PM.",
  },
  {
    question: "What age do I have to be to join?",
    answer:
      "We have 2 primary programs, covering ages 9 to 18. We are also always looking for adult mentors willing to share their skills with our students.",
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
      "What if I am not interested in robots, engineering, or computers?",
    answer:
      "You should definitely still check us out! We have many students who are interested in art, business, video production, and more - there is a place on our teams for just about everyone.",
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

export const metadata: Metadata = {
  description:
    "Are you or is someone you know interested in LEGO®, science, technology, engineering, math, business, marketing, video production, software development, web design, carpentry, or leadership? Find out more and get a chance to speak with our students and mentors at our upcoming open house.",
};

export default function OpenHouse(): ReactNode {
  return (
    <>
      <HeroHeader img="/image/students.webp">
        <div className="flex flex-col space-y-6 text-foreground">
          <div className="text-4xl font-bold md:text-5xl mb-0">
            Want to know more about <Highlight>STEM</Highlight> and{" "}
            <Highlight>Robots</Highlight>?
          </div>
          <div className="text-2xl">
            Join us for our open house on{" "}
            <Highlight>Thursday, June 6 (7PM - 8:30)</Highlight> and{" "}
            <Highlight>Saturday, June 8 (9AM - 12PM)</Highlight> in downtown
            Chambersburg to see what we&apos;re all about.
          </div>
        </div>
      </HeroHeader>

      <PatternBackground>
        <div className="flex flex-col gap-y-16 py-10">
          <div className="flex flex-col items-center space-y-6 mx-auto md:max-w-screen-lg px-6 text-center">
            <h2 className="heading-2">
              Meet the teams, see the robots, and learn more about our programs.
            </h2>
            <div className="max-w-5xl text-center text-lg">
              Are you or is someone you know interested in LEGO®, science,
              technology, engineering, math, business, marketing, video
              production, software development, web design, carpentry, or
              leadership? Find out more and get a chance to speak with our
              students and mentors at our upcoming open house.
            </div>
          </div>

          <Section>
            <div className="flex flex-wrap justify-center gap-5">
              {programCards.map((card, i) => (
                <div key={i}>
                  <FeatureCard key={i} {...card} />
                </div>
              ))}
            </div>
          </Section>

          <div className="space-y-4 py-8">
            <div className="md:max-w-screen-xl mx-auto px-10 md:px-12">
              <div className="md:max-w-[800px] mb-10 mx-auto">
                <Image
                  src={openHouseImage}
                  alt="South Central STEM Collective open house banner"
                  className="mb-8"
                />
                <Card
                  shadow="lg"
                  radioGroup="md"
                  radius="lg"
                  className="w-fit mx-auto p-2"
                  classNames={{
                    header: "m-0 p-0",
                  }}
                >
                  <CardBody>
                    <div className="space-y-4 items-center justify-center flex flex-col my-auto">
                      <h5 className="text-lg">Connect with us</h5>
                      <Button
                        startContent={<IconBrandFacebook />}
                        className="bg-blue-500 w-full"
                        as={Link}
                        href="https://go.scstem.tech/facebook"
                        target="_blank"
                      >
                        Like us on Facebook
                      </Button>
                      <h5 className="text-lg !mt-6">
                        Let us know you&apos;re coming
                      </h5>
                      <Button
                        startContent={<IconCalendarEvent />}
                        className="bg-red-500 w-full"
                        as={Link}
                        href="https://www.facebook.com/events/1113583296542229/"
                        target="_blank"
                      >
                        Thursday
                      </Button>
                      <Button
                        startContent={<IconCalendarEvent />}
                        className="bg-red-500 w-full"
                        as={Link}
                        href="https://www.facebook.com/events/1113583299875562/"
                        target="_blank"
                      >
                        Saturday
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="flex flex-col md:flex-row gap-16">
                <div className="flex-1 flex flex-col gap-y-4">
                  <h3 className="heading-3 text-center">FAQ</h3>
                  <Divider className="bg-white/50" />
                  <div className="space-y-6">
                    {faq.map((qa) => (
                      <div
                        key={qa.question}
                        className="flex flex-col space-y-2"
                      >
                        <div className="text-lg font-bold">{qa.question}</div>
                        <div>{qa.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-y-4">
                  <h3 className="heading-3 text-center">
                    Workspace and Directions
                  </h3>
                  <Divider className="bg-white/50" />

                  <div>
                    We are located at{" "}
                    <Link
                      href="https://maps.app.goo.gl/kreAVn1bKVSrKXqQ8"
                      target="_blank"
                    >
                      20 South Main Street
                    </Link>{" "}
                    in downtown Chambersburg.
                  </div>
                  <ol className="mb-6 list-decimal pl-6 space-y-2">
                    <li>
                      Access our parking lot off of South Central Ave by heading
                      west on Route 30 and turning left onto South Central Ave{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        style={{ width: "1.5rem" }}
                        className="inline-block -mt-1"
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
                      Park in either of the highlighted parking lots. Enter
                      through the door marked &ldquo;20 South Main St.&rdquo;
                    </li>
                  </ol>

                  <div className="italic text-center text-sm -mb-2">
                    Click on map icons for details.
                  </div>

                  <iframe
                    title="Google map of how to get to our workspace"
                    src="https://www.google.com/maps/d/u/0/embed?mid=1Y7nIneTb6OUfwTh8RhIM0jE_0fiUSzU&ehbc=2E312F&noprof=1"
                    width="100%"
                    height="500"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-center mb-4 md:mb-6 text-2xl font-semibold">
              Can&apos;t make it but want to know more?
            </h2>
            <VideoPlayer
              url="https://youtu.be/147CgudTur8"
              placeholder="/image/morethanrobots.webp"
            />
          </div>
        </div>
      </PatternBackground>
    </>
  );
}
