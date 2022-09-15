import React from "react";
import HeroType from "../components/HeroType";
import DefaultLayout from "../layouts/Default";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <main>
        <header className="dark:bg-[url('/svg/circuit-board-dark.svg')] bg-[url('/svg/circuit-board-light.svg')] h-[40vh]">
          <div className="flex flex-col md:pt-36 md:px-48">
            <HeroType className="text-5xl mx-auto drop-shadow-md" />
            <div className="mt-16 mx-auto flex">
              <a className="btn btn-primary">About Us</a>
            </div>
          </div>
        </header>
        <main className="prose border-solid border-0 border-t-2 border-opacity-20 border-[#171717] dark:border-[#facc15] dark:border-opacity-20 pt-20 px-52 grid grid-cols-3 grid-rows-3 gap-28 place-items-center">
          {/* Section 1 */}
          <div className="col-span-2">
            <h2>Who are we?</h2>
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
                  Acquire and maintain a collaborative workspace for communal
                  use by all groups and members.
                </li>
                <li>
                  Foster a creative and collaborative environment for
                  experimentation and development in technology.
                </li>
                <li>
                  Provide STEM education and mentorship to youth in grades K-12
                  as it pertains to robotics, drones, and maker labs.
                </li>
                <li>
                  Share technology developments and ideas with the world at
                  large.
                </li>
              </ul>
            </p>
          </div>
          <img src="/svg/undraw/building.svg" />

          {/* Section 2 */}
          <img src="/svg/undraw/maker-launch.svg" />
          <div className="col-span-2">
            <h2>How can you get involved?</h2>
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
                  Acquire and maintain a collaborative workspace for communal
                  use by all groups and members.
                </li>
                <li>
                  Foster a creative and collaborative environment for
                  experimentation and development in technology.
                </li>
                <li>
                  Provide STEM education and mentorship to youth in grades K-12
                  as it pertains to robotics, drones, and maker labs.
                </li>
                <li>
                  Share technology developments and ideas with the world at
                  large.
                </li>
              </ul>
            </p>
          </div>
        </main>
      </main>
    </DefaultLayout>
  );
}
