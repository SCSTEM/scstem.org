import React from "react";
import HeroHeader from "../components/home/hero/Header";
import HeroType from "../components/home/hero/Typer";
import HomeSection from "../components/home/Section";
import DefaultLayout from "../layouts/Default";
import Button from "../components/Button";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader className="bg-[url('/svg/circuit-board-light.svg')] dark:bg-[url('/svg/circuit-board-dark.svg')] dark:text-primary">
        <div className="mx-auto h-28 w-4/5 text-center text-4xl text-white drop-shadow-md md:w-1/2 md:text-5xl">
          <HeroType />
        </div>
        <div className="mt-10 flex justify-center space-x-2">
          <Button href="/about">About Us</Button>
          <Button href="/sponsors">Our Sponsors</Button>
          <Button href="/blog">Our Blog</Button>
        </div>
      </HeroHeader>
      <main className="space-y-32 border-0 border-t-2 border-solid border-dark border-opacity-20 p-8 dark:border-primary dark:border-opacity-10 md:p-32 xl:p-48">
        {/* Section 1 */}
        <HomeSection
          title={`What is the "South Central STEM Collective"?`}
          image="/svg/undraw/building.svg"
        >
          <p>
            The South Central STEM Collective (otherwise known as SC2) was
            created to serve South Central Pennsylvania as "STEM Central" to
            inspire youth aged K-12 through hands-on education, competitive
            robotics and drone teams, maker spaces, and community outreach.
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
          title="Who are we?"
          image="/svg/undraw/maker-launch.svg"
          flipped
        >
          <p>
            The South Central STEM Collective (otherwise known as SC2) was
            created to serve South Central Pennsylvania as "STEM Central" to
            inspire youth aged K-12 through hands-on education, competitive
            robotics and drone teams, maker spaces, and community outreach.
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

        {/* Section 3 */}
        <HomeSection
          title="How can you get involved?"
          image="/svg/undraw/high-five.svg"
        >
          <p>
            South Central STEM Collective was created to serve South Central
            Pennsylvania as "STEM Central" to inspire youth aged K-12 through
            hands-on education, competitive robotics and drone teams, maker
            spaces, and community outreach.
          </p>
          <p>
            To achieve this goal, the South Central STEM Collective (otherwise
            known as SC2) plans to offer a range of activities, resources,
            space, and industry expertise in addition to the following:
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
      </main>
    </DefaultLayout>
  );
}
