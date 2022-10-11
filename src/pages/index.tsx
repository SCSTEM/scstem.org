import React from "react";
import HeroHeader from "../components/home/hero/Header";
import HeroType from "../components/home/hero/Typer";
import HomeSection from "../components/home/Section";
import DefaultLayout from "../layouts/Default";
import Button from "../components/Button";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader>
        <HeroType className="mx-auto text-3xl drop-shadow-md md:text-5xl" />
        <div className="mx-auto mt-16 flex space-x-2">
          <Button href="/about">About Us</Button>
          <Button href="/sponsors">Our Sponsors</Button>
          <Button href="/blog">Our Blog</Button>
        </div>
      </HeroHeader>
      <main className="space-y-32 border-0 border-t-2 border-solid border-dark border-opacity-20 p-4 dark:border-primary dark:border-opacity-10 md:p-48">
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
      </main>
    </DefaultLayout>
  );
}
