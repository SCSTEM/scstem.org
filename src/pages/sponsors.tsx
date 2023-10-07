import { Sponsors as data } from "@site/data";
import HeroHeader from "@site/src/components/HeroHeader";
import SponsorCard from "@site/src/components/cards/SponsorCard";
import DefaultLayout from "@site/src/layouts/Default";

export default function Sponsors(): JSX.Element {
  return (
    <DefaultLayout title="Sponsors">
      <HeroHeader img="/img/parts-notes.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Sponsors help us{" "}
            <span className="dark:text-yellow-500 text-blue-400">build</span>.
          </div>
          <div className="text-2xl">
            We are proud to partner organizations and individuals who want to
            join us in building the future. This strong support enables our
            mentors, volunteers, and parents to focus on what really matters.
          </div>
        </div>
      </HeroHeader>
      <main className="mx-auto grid grid-cols-1 gap-10 py-6 sm:grid-cols-2 md:py-20 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </main>
    </DefaultLayout>
  );
}
