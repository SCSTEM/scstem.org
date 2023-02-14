import React from "react";

import Button from "@site/src/components/Button";
import HeroHeader from "@site/src/components/HeroHeader";
import Highlight from "@site/src/components/Highlight";
import HomeSection from "@site/src/components/home/Section";
import DefaultLayout from "@site/src/layouts/Default";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader2 img="/img/parts-notes.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-m_yellow-5 to-m_yellow-9 bg-clip-text text-transparent dark:from-m_yellow-4 dark:to-m_yellow-7">
              Robots
            </span>{" "}
            are in Franklin County.
          </div>
          <div className="text-2xl">
            Cupidatat dolor adipisicing sunt aliquip quis do incididunt
            excepteur amet. Cupidatat dolor adipisicing sunt aliquip quis do
            incididunt excepteur amet.
          </div>
        </div>
      </HeroHeader2>

      <main className="space-y-32 border-0 border-t-2 border-solid border-dark border-opacity-20 p-8 dark:border-primary dark:border-opacity-10 md:p-24 xl:p-32">
        {/* Section 1 */}
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

        {/* Section 2 */}
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
            <Button
              to="/get-involved"
              className="text-dark"
              variant="gradient"
              gradient={{ from: "brand-yellow", to: "brand-orange" }}
            >
              Get Involved
            </Button>
          </div>
        </HomeSection>
      </main>
    </DefaultLayout>
  );
}
