import { Overlay, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";

import Underline from "@site/src/components/spans/Underline";
import DefaultLayout from "@site/src/layouts/Default";

export default function BiohazardHome(): JSX.Element {
  const isSmall = useMediaQuery("(max-width: 992px)");

  return (
    <DefaultLayout
      title="Biohazard Robotics"
      description="FRC Team 4050: Biohazard. Competitive high-school robotics team."
    >
      <header className="relative h-[calc(101vh-var(--ifm-navbar-height))] w-full text-white">
        <div className="absolute -z-0 h-full w-full">
          <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)" />
          <video
            className="object-cover"
            width="100%"
            height="100%"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/img/biohazard/home-video.webm" type="video/webm" />
            <source src="/img/biohazard/home-video.mp4" type="video/mp4" />
            <img src="/img/biohazard/home-image.webp" />
          </video>
        </div>
        <div className="relative flex h-full flex-col w-full md:w-[750px] lg:w-[1000px] mx-auto text-center">
          <img
            className="lg:mt-36 md:my-4 my-2 lg:mb-16"
            src="/img/biohazard/header-logo.svg"
          />
          <div className="mx-5 space-y-4 md:space-y-10">
            <Title order={1} className="text-xl md:text-4xl md:!leading-[3rem]">
              Welcome to the{" "}
              <Underline color="brand-green">next generation</Underline> of
              thinkers, engineers scientists, artists, and dreamers.
            </Title>
            <Title className="font-sans md:text-h2 text-lg" order={2}>
              Inspiring students since{" "}
              <span className="text-brand-green">2012</span>, Biohazard is
              south-central Pennsylvania's premiere high-school robotics team
              and we need you to take us to the{" "}
              <span className="text-brand-green">next level</span>.
            </Title>
          </div>
          <button
            className="mx-auto flex cursor-pointer flex-col items-center border-none bg-transparent md:text-2xl font-bold outline-none text-brand-green mt-auto mb-20 md:mb-10"
            onClick={() =>
              document
                .getElementById("scrollhere")
                .scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Find out how
            <IconChevronDown
              size={isSmall ? 50 : 75}
              stroke={1.5}
              className="animate-bounce mt-1"
            />
          </button>
        </div>
        <div id="scrollhere" className="mb-10"></div>
      </header>
      <main>Resume normal homepage activities here</main>
    </DefaultLayout>
  );
}
