import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import SponsorCard from "@site/src/components/SponsorCard";
import { Sponsors as data } from "@site/data";
import HeroHeader2 from "../components/home/hero/Header2";

export default function Test(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader2 img="/img/legos.webp" fullscreen />
      <div className="mx-auto grid grid-cols-1 gap-10 py-6 md:grid-cols-2 md:py-20 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </div>
    </DefaultLayout>
  );
}
