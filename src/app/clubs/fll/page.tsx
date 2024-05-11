import { Link } from "@nextui-org/link";

import { PatternBackground } from "@/components/PatternBackground";
import HeroHeader from "@/components/page/HeroHeader";
import { Highlight } from "@/components/spans";

export default function FLL(): JSX.Element {
  return (
    <>
      <HeroHeader img="/image/lego-robots.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-4xl font-bold md:text-5xl mb-0 space-y-4">
            <div>This page is under construction.</div>
            <div>
              <Link
                href="/get-involved"
                className="text-4xl font-bold md:text-5xl"
              >
                <Highlight>Contact Us</Highlight>
              </Link>{" "}
              to learn more about our Lego Robotics program.
            </div>
          </div>
        </div>
      </HeroHeader>
      <PatternBackground pattern="circuit" color="orange">
        <main className="max-w-screen-md md:mx-auto gap-y-10 mx-5 h-[500px]"></main>
      </PatternBackground>
    </>
  );
}
