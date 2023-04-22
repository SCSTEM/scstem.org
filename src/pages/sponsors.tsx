import { Sponsors as data } from "@site/data";
import HeroHeader from "@site/src/components/HeroHeader";
import Highlight from "@site/src/components/Highlight";
import SponsorCard from "@site/src/components/SponsorCard";
import DefaultLayout from "@site/src/layouts/Default";

export default function Sponsors(): JSX.Element {
  return (
    <DefaultLayout title="Sponsors">
      <HeroHeader img="/img/parts-notes.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Sponsors help us <Highlight theme="dark">build</Highlight>.
          </div>
          <div className="text-2xl">
            We are proud to partner organizations and individuals who want to
            join us in building the future. This strong support enables our
            mentors, volunteers, and parents to focus on what really matters.
          </div>
        </div>
      </HeroHeader>
      <div className="mx-auto grid grid-cols-1 gap-10 py-6 md:grid-cols-2 md:py-20 lg:grid-cols-3 xl:grid-cols-4 md:max-w-screen-xl">
        {data.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </div>
    </DefaultLayout>
  );
}
