import { motion } from "framer-motion";
import type { StaticImageData } from "next/image";
import { Children, type ReactNode } from "react";

import SlidingDiv from "@/components/CalendarAnimated";
import CalendarAnimated from "@/components/CalendarAnimated";
import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";

import header2015 from "@/image/biohazard/2015-header.webp";
import outreach2018 from "@/image/biohazard/2018-outreach.webp";
import robot2019 from "@/image/biohazard/2019-robot-demo.webp";
import image2021 from "@/image/biohazard/2021-meeting.jpg";
import robot2021 from "@/image/biohazard/2021-robot-lights.jpg";
import robot2022 from "@/image/biohazard/2022-robot-hat.jpg";
import robot2023 from "@/image/biohazard/2023-robot-balls.jpg";
import robot2024 from "@/image/biohazard/2024-robot-crash.jpg";
//Need a picture of 'the other crash'
import cornfest2017 from "@/image/biohazard/cornfest-2017.webp";
import firemen from "@/image/biohazard/firemen.jpg";
import logo2012 from "@/image/biohazard/logo-2012.webp";
import logo2018 from "@/image/biohazard/logo-2018.webp";
import logo2022 from "@/image/biohazard/logo-2022.webp";
import deanSignature from "@/image/biohazard/signature.webp";
import competition1Image from "@/image/competition-1.webp";
import deanImage from "@/image/dean.webp";
import logo2016 from "@/image/svg/biohazard-2016.svg";
import logo2020 from "@/image/svg/biohazard-2020.svg";
import testImage from "@/image/svg/logo-color.svg";
import image2013 from "@/image/team/frc/2013.webp";
import image2014 from "@/image/team/frc/2014.webp";
import image2015 from "@/image/team/frc/2015.webp";
import image2016 from "@/image/team/frc/2016.webp";
import image2017 from "@/image/team/frc/2017.webp";
import image2018 from "@/image/team/frc/2018.webp";
import image2019 from "@/image/team/frc/2019.webp";
import image2020 from "@/image/team/frc/2020.webp";
import image2022 from "@/image/team/frc/2022.webp";
import image2023 from "@/image/team/frc/2023.webp";
import image2024 from "@/image/team/frc/2024.webp";

type PageTopProps = {
  year: string;
  image: StaticImageData;
  children?: ReactNode;
};

function PageTop({ year, image, children }: PageTopProps) {
  return (
    <>
      <div className="relative">
        <h1 className="heading-1 ml-8 text-8xl z-10 text-center">{year}</h1>
        <div className="h-full">
          <Image
            src={image}
            alt="team image"
            style={{ maxHeight: 500 }}
            className="flex items-center w-full"
          />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

type PageBottomProps = {
  text: JSX.Element;
  children?: ReactNode;
};

function PageBottom({ text, children }: PageBottomProps) {
  return (
    <>
      <div style={{ height: 700 }}>
        <p className="p-8">{text}</p>
        {children}
      </div>
    </>
  );
}

type Page = {
  top: ReactNode;
  bottom: ReactNode;
};

const pages: Page[] = [
  {
    top: (
      <>
        <PageTop year="2012" image={testImage}></PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Our team officially began on January 7th, 2012, but under a
              different name. Tech Team Franklin began their six-week build
              period late, with only ten members and a handful of mentors.
              Through consistent meetings and training in mechanical,
              electrical, and programming, our first robot “Genesis” was born.
              We competed in the Greater Pittsburgh Regional, coming home with
              valuable experience and an eagerness for the next year.
            </>
          }
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2013" image={image2013}>
          <Image
            src={logo2012}
            alt="team logo"
            className="hidden sm:block absolute bottom-2 size-32 md:size-48 left-1/2 -ml-16 md:-ml-24"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Biohazard 4050 was a fresh start for our team, with a new name and
              image. After growing our team significantly in numbers—by both
              members and mentors—we engaged in our second season. Six weeks of
              intense prototyping, building, and testing ensued before we and
              our robot, “Total Meltdown,” attended the Pittsburgh and
              Chesapeake Regionals, finishing in the playoffs in both events. We
              had greatly improved since our start a year before.
            </>
          }
        >
          <Image
            src={header2015}
            alt="2015 website header"
            className="pt-8 pl-8"
          ></Image>
          <h1 className="pl-8 pt-2">
            Our old website header.{" "}
            <a
              href="https://throwback.biohazard4050.org/"
              className="text-green-700 underline"
            >
              Archive
            </a>
          </h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2014" image={image2014}>
          <Image
            src={logo2012}
            alt="team logo"
            className="hidden sm:block absolute bottom-12 size-32 left-1/2 -ml-16 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              With ever growing members, we began training for scouting and
              improving our build stategy. This Our robot, “Toxic Lepra-Khan”,
              won the excellence in engineering award. We also got it signed by
              the legendary Dean Kamen!
            </>
          }
        >
          <Image
            src={deanSignature}
            alt="Dean Kamen's signature on Toxic Lepra-Khan"
            className="p-8 h-96"
          ></Image>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2015" image={image2015}>
          <Image
            src={logo2012}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-32 left-1/2 -ml-80 lg:-ml-96 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              With our fourth year came experience and a routine schedule. We
              built our towering “Anonymous” who stacked totes and recycling
              containers. After a disappointing appearance at the Pittsburgh
              Regional, we made modifications and had the opportunity to go to
              the Chesapeake Regional, where we were selected by the top ranked
              alliance and won the event! Subsequently, this was the first time
              Biohazard visited the worlds competition in St. Louis!
            </>
          }
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2016" image={image2016}></PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Our fifth year began our new approach to the build season. After
              heavy strategizing, we created a game plan for our new robot,
              “Dialga - The Steel Dragon”. Continuing in our tradition of
              building a practice robot, we continued to design and build after
              the conclusion of our build season. We attended the Pittsburgh
              Regional and nearly won the entire event after making it into the
              finals. After making further improvements, we went to the Smoky
              Mountain Regional and made it to the quarter-finals. We walked
              away with a beautiful silver metal and the Quality Award.
            </>
          }
        >
          <h1 className="p-8">
            This year, the biohazard logo was redesigned for the first time:
          </h1>
          <Image src={logo2016} alt="team logo" className="p-8 size-96"></Image>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2017" image={image2017}>
          <Image
            src={logo2018}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-32 left-1/2 -ml-16 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              As our senior students graduated, fresh students began to fill
              their place, with a fresh new workspace to boot. Our sixth year we
              competed in the Steamworks game with our robot, “Boiling Point”.
              Attending the Greater Pittsburgh Regional, we ranked 13th, and at
              the Buckeye Regional we ranked 20, making it to quarter finals at
              both competitions! 2017 was also the first year the team entered
              into the Battle O&apos;Baltimore, now an offseason tradition.{" "}
            </>
          }
        >
          <Image
            src={cornfest2017}
            alt="team logo"
            style={{ height: 400 }}
            className="pt-8"
          ></Image>
          <h1 className="text-center p-2">
            The team helps out at Chambersburg Cornfest, now another offseason
            tradition.
          </h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2018" image={image2018}>
          <Image
            src={logo2018}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-32 left-1/2 -ml-16 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Our seveth year was a wild one for the team, but a good learning
              experience. We competed in the Greater Pittsburgh Regional, SBPLI
              Long Island Regional #2, and the Battle O&apos; Baltimore. While
              at the Long Island Regional, we won the Creativity Award!{" "}
            </>
          }
        >
          <Image
            src={outreach2018}
            alt="team logo"
            style={{ height: 400 }}
            className="pt-8"
          ></Image>
          <h1 className="text-center p-2">
            Reaching out to younger children has always been a part of FIRST.
          </h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2019" image={image2019}></PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              In our eighth year we went in strong with 21 students, the largest
              our team has ever been. With a new space at the Chambersburg Mall,
              we built “Toxic Silver”, our first robot since 2016 to use
              pneumatics. Stading out from the other robots at the Greater
              Pittsburgh Regional and Battle O&apos; Baltimore, its unique
              design won us another Excellence in Engineering Award!{" "}
            </>
          }
        >
          <Image
            src={robot2019}
            alt="team logo"
            style={{ maxHeight: 517 }}
            className="flex pt-8 items-center w-full"
          ></Image>
          <h1 className="text-center p-2">Demo image of Toxic Silver.</h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2020" image={image2020}>
          <Image
            src={logo2020}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-40 left-1/2 -ml-20"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Many people would remember 2020 as the year everything went wrong,
              but for robotics it was a decent season. We were lucky enough to
              compete in the Palmetto Regional before events were cancelled. Our
              robot “Robo Fett”, is one of our prettier designs, and one of the
              more reliable robots, too.{" "}
            </>
          }
        >
          <Image
            src={robot2021}
            alt="team logo"
            style={{ maxHeight: 517 }}
            className="flex pt-8 items-center w-full"
          ></Image>
          <h1 className="text-center p-2">
            Robo Fett with its lights on full blast.
          </h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2021" image={image2021}>
          <Image
            src={logo2020}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-40 left-1/2 -ml-20"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              For our tenth anniversary, 2021 was a unique year. Thankfully,
              though there were no official competitions to attend, Battle
              O&apos; Baltimore was still being hosted.{" "}
            </>
          }
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2022" image={image2022}>
          <Image
            src={logo2022}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-40 left-1/2 -ml-20 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              2022 Was a fantastic year for Biohazard, despite us losing our
              long-standing partnership with 4H. Our robot, “O&apos;Mega”
              competed in both the Greater Pittsburgh and Smoky Mountains
              Regionals, and won the Industrial Design Award at both events! We
              even had the opportunity to have it signed by MC Blair
              Hundertmark!
            </>
          }
        >
          <Image
            src={robot2022}
            alt="team logo"
            style={{ maxHeight: 517 }}
            className="flex pt-8 items-center w-full"
          ></Image>
          <h1 className="text-center p-2">&quot;Hey there&quot;</h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2023" image={image2023}>
          <Image
            src={logo2022}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-40 left-1/2 -ml-20 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Our twelfth year, though fun, was bittersweet, as we had to say
              goodbye to our home of 4 years at the now condemned Chambersburg
              Mall. Our robot, “Viper” certainly fit our design trademark of
              uniqueness. Although our rank was low at the GPR, we won an
              Industrial Design Award for our 3d-printed claw and easily
              replacable parts. At the Battle O&apos; Baltimore offseason
              competition, we tested a new type of drivetrain; the ball drive,
              and got picked for the winning alliance!
            </>
          }
        >
          <Image
            src={robot2023}
            alt="team logo"
            style={{ height: 400 }}
            className="pt-8 w-full"
          ></Image>
          <h1 className="text-center p-2">
            Mentor Dan Shope performing maintenance on his ball drive design.
          </h1>
        </PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2024" image={image2024}>
          <Image
            src={logo2022}
            alt="team logo"
            className="hidden sm:block absolute bottom-0 size-40 left-1/2 -ml-20 mb-2"
          ></Image>
        </PageTop>
      </>
    ),
    bottom: (
      <>
        <PageBottom
          text={
            <>
              Between getting used to our new home at 20 S Main St. in
              Chambersburg, and creating SCSTEM, managing our thirteenth year
              was a challenge, let alone a fire nearly starting in the
              workspace. Nevertheless, our robot, “Troubleclef” won us an
              Imagery Award at the Buckeye Regional!
            </>
          }
        >
          <div className="flex space-x-8 justify-center">
            <Image
              src={robot2024}
              alt="team logo"
              style={{ height: 400 }}
              className="pt-8 w-min"
            ></Image>
            <Image
              src={firemen}
              alt="team logo"
              style={{ height: 400 }}
              className="pt-8 w-min"
            ></Image>
          </div>
          <h1 className="text-center p-2">
            Things don&apos;t always go as planned...
          </h1>
        </PageBottom>
      </>
    ),
  },
];

export default function History() {
  return (
    <>
      <CalendarAnimated height={700} time={1} pages={pages}></CalendarAnimated>
    </>
  );
}
