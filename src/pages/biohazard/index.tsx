import React from "react";
import HeroHeader from "../../components/home/hero/Header";
import HomeSection from "../../components/home/Section";
import DefaultLayout from "../../layouts/Default";

export default function Biohazard(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader className="bg-[url('/img/people-cheering.webp')] bg-cover bg-bottom text-white">
        <h1 className="mx-auto h-28 w-4/5 text-center text-4xl drop-shadow-md md:w-1/2 md:text-5xl">
          Biohazard
        </h1>
        <div className="mt-10 flex justify-center space-x-2">
          {/*}
            <Button href="/about" value="About Us" />
            <Button href="/sponsors" value="Our Sponsors" />
            <Button href="/blog" value="Our Blog" />
          {*/}
        </div>
      </HeroHeader>
      <main className="space-y-32 border-0 border-t-2 border-solid border-green border-opacity-20 p-8 dark:border-opacity-10 md:p-32 xl:p-40">
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
      </main>
    </DefaultLayout>
  );
}
