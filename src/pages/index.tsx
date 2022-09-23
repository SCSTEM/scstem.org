import React from "react";
import Button from "../components/Button";
import HeroHeader from "../components/home/hero/Header";
import HeroType from "../components/home/hero/Typer";
import HomeSection from "../components/home/Section";
import DefaultLayout from "../layouts/Default";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader>
        <HeroType className="text-3xl md:text-5xl mx-auto drop-shadow-md" />
        <div className="mt-16 mx-auto flex space-x-2">
          <Button href="/about" value="About Us" />
          <Button href="/sponsors" value="Our Sponsors" />
          <Button href="/blog" value="Our Blog" />
        </div>
      </HeroHeader>
      <main className="border-solid border-0 border-t-2 border-opacity-20 border-dark dark:border-primary dark:border-opacity-10 p-4 md:p-48 space-y-32">
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

          <div className="flex justify-center">
            <Button href="/about" value="Learn More" />
          </div>
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

          <div className="flex justify-center">
            <Button href="/about" value="Learn More" />
          </div>
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

          <div className="flex justify-center">
            <Button href="/about" value="Learn More" />
          </div>
        </HomeSection>
      </main>
    </DefaultLayout>
  );
}
