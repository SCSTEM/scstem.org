import React from "react";
import HeroHeader from "../../components/home/hero/Header";
import HeroType from "../../components/home/hero/Typer";
import HomeSection from "../../components/home/Section";
import DefaultLayout from "../../layouts/Default";

export default function Biohazard(): JSX.Element {
  return (
    <DefaultLayout>
      <header className="h-[40vh] bg-[url('/img/people-cheering.webp')] bg-cover bg-bottom">
        <div className="flex flex-col md:px-48 md:pt-36">
          <h1 className="mx-auto text-xl text-white drop-shadow-md md:text-5xl">
            Biohazard
          </h1>
          <div className="mx-auto mt-16 flex space-x-2">
            {/*}
            <Button href="/about" value="About Us" />
            <Button href="/sponsors" value="Our Sponsors" />
            <Button href="/blog" value="Our Blog" />
  {*/}
          </div>
        </div>
      </header>
      <main className="prose space-y-32 border-0 border-t-2 border-solid border-green border-opacity-20 p-48 dark:border-opacity-10">
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
          <p>
            <ul>
              <li>
                Acquire and maintain a collaborative workspace for communal use
                by all groups and members.
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
          </p>
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
          <p>
            <ul>
              <li>
                Acquire and maintain a collaborative workspace for communal use
                by all groups and members.
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
          </p>
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
          <p>
            <ul>
              <li>
                Acquire and maintain a collaborative workspace for communal use
                by all groups and members.
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
          </p>
          <div className="flex justify-center"></div>
        </HomeSection>
      </main>
    </DefaultLayout>
  );
}
