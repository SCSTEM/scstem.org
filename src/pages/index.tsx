import Button from "../components/Button";
import React from "react";
import HeroHeader from "../components/home/hero/Header";
import HeroType from "../components/home/hero/Typer";
import HomeSection from "../components/home/Section";
import DefaultLayout from "../layouts/Default";
import Highlight from "../components/Highlight";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader className="bg-[url('/img/svg/circuit-board-light.svg')] dark:bg-[url('/img/svg/circuit-board-dark.svg')] dark:text-primary">
        <div className="mx-auto h-28 w-4/5 text-center text-4xl drop-shadow-md dark:text-white md:w-1/2 md:text-5xl ">
          <HeroType />
        </div>
        <div className="mx-auto mt-10 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-2 md:space-y-0">
          <Button to="/about" className="w-36">
            About Us
          </Button>
          <Button to="/sponsors" className="w-36">
            Our Sponsors
          </Button>
          <Button to="/get-involved" className="w-36">
            Get Involved
          </Button>
        </div>
      </HeroHeader>
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
