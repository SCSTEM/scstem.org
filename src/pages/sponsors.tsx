import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import SponsorCard from "@site/src/components/SponsorCard";
import { Sponsors as data } from "@site/data";
import HeroHeader2 from "../components/home/hero/Header2";

export default function Sponsors(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader2 img="/img/legos.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Sponsors help us{" "}
            <span className="bg-gradient-to-r from-m_yellow-5 to-m_yellow-9 bg-clip-text text-transparent dark:from-m_yellow-4 dark:to-m_yellow-7">
              build
            </span>
            .
          </div>
          <div className="text-2xl">
            We are proud to partner organizations and individuals who want to
            join us in building the future. This strong support enables our
            mentors, volunteers, and parents to focus on what really matters.
          </div>
        </div>
      </HeroHeader2>
      <div className="mx-auto grid grid-cols-1 gap-10 py-6 md:grid-cols-2 md:py-20 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </div>
    </DefaultLayout>
  );
}
