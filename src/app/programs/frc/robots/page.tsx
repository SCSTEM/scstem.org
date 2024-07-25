import type { ReactNode } from "react";

import IconTooltip from "@/components/IconTooltip";
import { Image } from "@/components/Image";
import { ManualCarousel } from "@/components/ManualCarousel";
import { PatternBackground } from "@/components/PatternBackground";
import {
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";

import troubleClef from "@/image/biohazard/trouble-logo.webp";
import viperLogo from "@/image/biohazard/viper-logo.webp";
import InfoIcon from "@/image/svg/info-mark.svg";

import { ParallaxImage } from "../components";

function SlideButtons() {
  return (
    <>
      <CarouselPrevious
        className={"w-20 h-24 opacity-85"}
        variant={"default"}
        size={"lg"}
      ></CarouselPrevious>
      <CarouselNext
        className={"w-20 h-24 opacity-85"}
        variant={"default"}
        size={"lg"}
      ></CarouselNext>
    </>
  );
}

type Props = {
  children?: ReactNode;
};

function Card({ children }: Props): JSX.Element {
  return (
    <>
      <div className="border-y-8 border-yellow-400">
        <PatternBackground pattern="circuit">
          <div className="py-12 px-6">{children}</div>
        </PatternBackground>
      </div>
    </>
  );
}

//TODO: find better picture of Toxic Silver for display on mobile screens
const slides: JSX.Element[] = [
  <>
    <h1 className="heading-2 text-7xl text-center m-4">2019 - Toxic Silver</h1>
    <ParallaxImage background="/image/biohazard/2019-robot-field.webp">
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <Card>
      <h1 className="px-14 pb-4 text-2xl heading-2">Overview</h1>
      <p className="xl:w-3/4">
        With its shining aluminum lift and maneuverable mecanum drivetrain,
        Toxic Silver won us an Excellence in Engineering Award at the Greater
        Pittsburgh Regional and Rank 8 at the Battle O&apos; Baltimore.
      </p>
    </Card>
  </>,
  <>
    <h1 className="heading-2 text-7xl text-center m-4">
      2020-2021 - Robo Fett
    </h1>
    <ParallaxImage background="/image/biohazard/2021-robot-field.webp">
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <Card>
      <h1 className="px-14 pb-4 text-2xl heading-2">Overview</h1>
      <p className="xl:w-3/4">
        Armed with a giant scissor-lift climber and an inline shooting
        mechanism, Robo Fett is one of two Biohazard robots to use pneumatic
        wheels. Along one side, a large plexiglass panel protects the
        electronics while proudly displaying the 2020 team logo.
      </p>
    </Card>
  </>,
  <>
    <h1 className="heading-2 text-7xl text-center m-4">2022 - O&apos;Mega</h1>
    <ParallaxImage background="/image/biohazard/2022-robot-field-3.webp">
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <Card>
      <h1 className="px-14 pb-4 text-2xl heading-2">Overview</h1>
      <p className="xl:w-3/4">
        One of our heavier robots, O&apos;Mega boasts a giant cannon, a sizeable
        intake, and two climbing arms. An adjustable firing mechanism allowed it
        to shoot into both hoops in the 2022 game, and won us a spot in the
        finals and an Industrial Design Award.
      </p>
    </Card>
  </>,
  <>
    <h1 className="heading-2 text-7xl text-center m-4">2023 - Viper</h1>
    <ParallaxImage background="/image/biohazard/2023-robot-field.webp">
      <Image
        src={viperLogo}
        alt="Viper logo"
        className="relative m-auto inset-y-1/2 w-[200px]"
      ></Image>
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <Card>
      <h1 className="px-14 pb-4 text-2xl heading-2 m-4">Overview</h1>
      <p className="xl:w-3/4">
        Competing in the 2023 Pittsburgh Regional Competition, Viper won us the
        Industrial Design Award, and a few curious looks from fellow teams. Its
        main features are the three foot metal arm and 3d printed pneumatic
        claw, used to atriculate inflatable cubes. Mecanum wheels allow it to
        fine-tune its position, and dual cameras gave our drivers lots of
        visibilty.
      </p>
    </Card>
  </>,
  <>
    <h1 className="heading-2 text-7xl text-center m-4">2024 - Troubleclef</h1>
    <ParallaxImage background="/image/biohazard/2024-robot-field.webp">
      <Image
        src={troubleClef}
        alt="TroubleClef logo"
        className="relative m-auto inset-y-1/2 w-[400px]"
      ></Image>
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <Card>
      <h1 className="px-14 pb-4 text-2xl heading-2">Overview</h1>
      <p className="xl:w-3/4">
        Amid more conventional and exposed designs, TroubleClef sticks out like
        a sore thumb with its sleek gunmetal sides and concealed electronics. A
        3d printed chain carries game pieces from the ground up to the peak of
        the ramp, and a pair of motors shoot it forward. Coming back from a loss
        in Pittsburgh, this machine got us 15th place at the Buckeye Valley
        Regional and helped us win our Imagery Award in the 2023-2024 season.
      </p>
    </Card>
  </>,
  <>
    <h1 className="heading-2 text-7xl text-center m-4">2025</h1>
    <div className="bg-black">
      <ParallaxImage>
        <SlideButtons></SlideButtons>
      </ParallaxImage>
    </div>
    <Card>
      <h1 className="px-14 pb-4 text-2xl heading-2">Coming soon...</h1>
      <p className="xl:w-3/4"></p>
    </Card>
  </>,
];

export default function Robots() {
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <h1 className="relative heading-2 text-7xl p-8 m-12 text-center border-y-8 border-yellow-400">
          2019-Present
          <div className="text-center absolute right-1 top-1">
            <IconTooltip
              icon={
                <>
                  <Image
                    src={InfoIcon}
                    alt="Info"
                    style={{
                      filter: `invert(78%) sepia(90%) saturate(2908%) hue-rotate(346deg) brightness(102%) contrast(96%)`,
                    }}
                  ></Image>
                </>
              }
              tooltip={
                <>
                  <h1>All robots that are in a semi-functional state</h1>
                </>
              }
            ></IconTooltip>
          </div>
        </h1>
      </div>

      <ManualCarousel
        slides={slides}
        noLoop={true}
        autoHeight={true}
        startIndex={slides.length - 2}
      ></ManualCarousel>
    </>
  );
}
