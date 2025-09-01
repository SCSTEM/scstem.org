import { Link } from "@heroui/link";
import type { Metadata } from "next/types";
import type { ReactNode } from "react";

import { Image } from "@/components/Image";

import biohazardLogo from "@/image/biohazard/logo.svg";
import sc2Logo from "@/image/svg/logo-color.svg";

import { LeftSidebar, RightSidebar } from "./components";

export const metadata: Metadata = {
  title: "About",
};

export default function About(): ReactNode {
  return (
    <div className="flex m-2 md:m-10">
      <div className="hidden lg:block mx-auto">
        <LeftSidebar />
      </div>
      <main className="prose prose-invert max-w-(--breakpoint-md) md:mx-auto gap-y-10 mx-5">
        <article>
          <h1>About Us</h1>
          <p>
            The South Central STEM Collective (otherwise known as SC2) was
            created to serve South Central Pennsylvania as &ldquo;STEM
            Central&rdquo; to inspire youth aged 9-18 through hands-on
            education, competitive robotics and drone teams, maker spaces, and
            community outreach.
          </p>
          <p>
            Although still in the early stages, SC2 has big plans to help
            students excited about science, engineering, technology, art, and
            more. Whether on the road to a high-school robotics competition or
            working hard with younger students excited about Lego projects, SC2
            is here to help students as they explore their futures.
          </p>
        </article>

        <article>
          <div className="flex">
            <div>
              <h2>History</h2>
              <p>
                To understand where SC2 is going, it is equally important to
                understand where SC2 came from. For this reason, it is important
                to start at the beginning: Biohazard.
              </p>
            </div>
            <Image
              src={biohazardLogo}
              className="w-[200px]"
              alt="Biohazard robotics team logo"
            />
          </div>
          <h3 className="mt-0">Biohazard</h3>
          <p>
            Biohazard is a FIRST Robotics Competition team, formed in 2012 by a
            small group of students and passionate volunteers as a club under
            the local 4-H program office.
          </p>
          <p>
            Between Biohazard&apos;s founding in 2012 and the early beginnings
            of SC2 in 2020, the team continued to grow, learn, and improve.
          </p>
          <ul className="space-y-1">
            <li>1 regional win</li>
            <li>3 workspaces</li>
            <li>9 competition robots</li>
            <ul>
              <li>+6 practice bots</li>
            </ul>
            <li>15 competitions</li>
            <li>8-30 students at various points</li>
          </ul>
          <p>
            This momentum pushed the team forward, but nobody could anticipate
            what was around the corner.
          </p>
          <h3>2020 and beyond</h3>
          <p>
            2020 was an interesting year for everyone in many different ways.
            For Biohazard, the year started the same way it always had. An
            exciting kickoff event in early January, followed by several weeks
            of robot building. At the end of February, the team made it to their
            first competition at Myrtle Beach, SC. It was a tough challenge and
            the team realized that there were several improvements to the robot
            design that had to take place before their next event in Pittsburgh,
            PA. Unfortunately, those few weeks between events saw the world
            change completely. The team never got to compete later that year in
            2020 and would not get to return to a regional event until 2022.
          </p>
          <p>
            With everyone stuck at home, still feeling the itch for competition
            and realizing the passion the students had, an idea started forming:
            &ldquo;Why couldn&apos;t we break away from 4-H and start our own
            program?&rdquo; At first glance, this question might seem
            counterproductive, as the original Biohazard website said, we were
            proud of our partnership with 4-H:
          </p>
          <blockquote className="font-normal">
            The students of Biohazard 4050 are not only members of FIRST, but
            are also members of the Franklin County (PA) 4-H Program. Their dual
            membership gives them a unique perspective and opportunities for
            local service and outreach within their community. The
            student&apos;s dedication to each other and their commitment to
            their community is a testimony to their character, service, and
            leadership skills. The volunteers and mentors of Biohazard 4050 are
            very proud of the students, and honored to be a part of their
            experiences!
            <br className="mb-5" />
            Biohazard, 2015
          </blockquote>
          <p>
            Unfortunately, this partnership left the team feeling like there was
            a lot of future growth being left on the table. Complicated
            financial management, fundraising limitations, membership rules, and
            a leadership/organization structure that could not keep pace with
            the rapidly developing world of STEM all contributed to the
            group&apos;s desire to take a different path. After many meetings,
            extensive planning sessions, thorough research, and support from
            Biohazard&apos;s parents and mentors, the South Central STEM
            Collective was born.
          </p>
          <div className="flex">
            <div>
              <h3>South Central STEM Collective</h3>
              <p>
                On paper, our mission is very simple: Make STEM opportunities
                accessible to students of all ages and backgrounds. In practice,
                this has been a challenge, but we are excited about what the
                future holds.
              </p>
              <p>
                The task to &ldquo;Make STEM opportunities accessible...&rdquo;
                comes in a variety of different forms, but our focus is
                ultimately on the students. To achieve this goal, a very general
                organization structure was formed:
              </p>
            </div>
            <Image
              src={sc2Logo}
              alt="South Central STEM Collective logo: A light bulb surrounded by a gear."
              className="w-[200px]"
            />
          </div>
          <ol className="space-y-1">
            <li>&ldquo;SC2&rdquo; acts as the umbrella organization</li>
            <ul>
              <li>501(c)(3) non-profit entity</li>
              <li>Insurance, workspace, and financial management</li>
              <li>Youth protection and volunteer responsibility</li>
              <li>Tool acquisition and training</li>
              <li>Presence in local community</li>
            </ul>
            <li>Clubs are formed under the SC2 entity</li>
            <ul>
              <li>Entirely self-managed and contained</li>
              <li>
                Own leadership structures, goals, bank accounts, schedules, etc.
              </li>
              <li>
                Access to SC2 resources (Internet, tools/equipment, workspace,
                industry experts, etc.)
              </li>
            </ul>
            <li>
              Students, parents, volunteers, and mentors work directly with
              their respective clubs
            </li>
            <ul>
              <li>
                Activities, competitions, external organizations (i.e.: FIRST)
              </li>
              <li>Club-driven fundraising</li>
            </ul>
          </ol>
          <p>
            This three-tier strategy allows our member clubs to operate
            independent of SC2 while also being able to benefit from the
            resources SC2 provides. Although subject to change in time, we
            believe this approach to STEM education has the potential for
            incredible impact, not constrained by the motivations of another
            parent organization.
          </p>
        </article>
        <article>
          <h2>Future</h2>
          <p>
            So what does the future hold? In many ways, the future is really up
            to the objectives and goals of our member clubs, but our focus has
            always been the same:{" "}
            <i>
              Serve South Central Pennsylvania as &ldquo;STEM Central&rdquo; to
              inspire youth aged K-12 through hands-on education, competitive
              robotics and drone teams, maker spaces, and community outreach
            </i>
            .
          </p>
          <p>
            It is a long road ahead, but we are excited to get there. Some of
            our specific goals on the horizon include:
          </p>
          <ul className="space-y-1">
            <li>Operate and maintain a makerspace</li>
            <li>
              Secure a permanent location for our workspace, classrooms, and
              office-space
            </li>
            <li>
              Become a staple in our local community, fostering STEM education
              where it has not been fully explored
            </li>
          </ul>
        </article>
        <article>
          <h2>What&apos;s next?</h2>
          <p>
            That&apos;s the story of SC2, but what about you? Whether you are a
            student, parent, industry professional, business owner, educator,
            explorer, or dreamer, we would love to hear from you. Feel free to{" "}
            <Link href="/contact">get in touch</Link>, we are looking forward to
            hearing from you.
          </p>
        </article>
      </main>
      <div className="hidden lg:block mx-auto">
        <RightSidebar />
      </div>
    </div>
  );
}
