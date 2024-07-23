import { motion } from "framer-motion";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

import SlidingDiv from "@/components/CalendarAnimated";
import CalendarAnimated from "@/components/CalendarAnimated";
import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";

import image2021 from "@/image/biohazard/2021-meeting.jpg";
import testImage from "@/image/cheering.webp";
import competition1Image from "@/image/competition-1.webp";
import deanImage from "@/image/dean.webp";
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
};

function PageTop({ year, image }: PageTopProps) {
  return (
    <>
      <div className="relative">
        <h1 className="absolute heading-1 ml-8 text-8xl z-10">{year}</h1>
        <Image
          src={image}
          alt="team image"
          style={{ height: 500 }}
          className="absolute right-0 w-3/4"
        />
      </div>
    </>
  );
}

type PageBottomProps = {
  text: JSX.Element;
};

function PageBottom({ text }: PageBottomProps) {
  return (
    <>
      <p className="p-8" style={{ height: 500 }}>
        {text}
      </p>
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
        <PageTop year="2013" image={image2013}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2014" image={deanImage}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2015" image={image2015}></PageTop>
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
              the Chesapeake Regional again. While there, we were selected by
              the top ranked alliance and won the event! This allowed us to go
              to the World Championship in St. Louis for the first time in our
              existence. We had an amazing time.{" "}
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2017" image={image2017}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2018" image={image2018}></PageTop>
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
        ></PageBottom>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2020" image={image2020}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2021" image={image2021}></PageTop>
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
        <PageTop year="2022" image={image2022}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2023" image={image2023}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
  {
    top: (
      <>
        <PageTop year="2024" image={image2024}></PageTop>
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
        ></PageBottom>
      </>
    ),
  },
];

export default function History() {
  return (
    <>
      <CalendarAnimated height={500} time={1} pages={pages}></CalendarAnimated>
    </>
  );
}
