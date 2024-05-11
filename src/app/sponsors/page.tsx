import { Link } from "@nextui-org/link";
import type { Metadata } from "next/types";

import { PatternBackground } from "@/components/PatternBackground";
import SponsorCard from "@/components/cards/SponsorCard";
import HeroHeader from "@/components/page/HeroHeader";
import Highlight from "@/components/spans/Highlight";
import Underline from "@/components/spans/Underline";
import { Sponsors as data } from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "We are proud to partner organizations and individuals who want to join us in building the future. This strong support enables our mentors, volunteers, and parents to focus on what really matters.",
};

export default function Sponsors(): JSX.Element {
  return (
    <>
      <HeroHeader img="/image/parts-notes.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-4xl font-bold md:text-5xl mb-0">
            <Highlight>Sponsors</Highlight> help us <Underline>build</Underline>
            .
          </div>
          <div className="text-2xl">
            We are proud to partner organizations and individuals who want to
            join us in building the future. This strong support enables our
            mentors, volunteers, and parents to focus on what really matters.
          </div>
        </div>
      </HeroHeader>

      <PatternBackground pattern="circuit">
        <div className="mx-auto grid grid-cols-1 gap-10 px-10 py-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((sponsor) => (
            <SponsorCard key={sponsor.name} {...sponsor} />
          ))}
        </div>
      </PatternBackground>
    </>
  );
}
