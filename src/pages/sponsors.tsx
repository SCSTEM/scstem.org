import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import SponsorCard from "@site/src/components/SponsorCard";
import { Sponsors as data } from "@site/data";
import { Overlay, Title, Text, Container } from "@mantine/core";

export default function Sponsors(): JSX.Element {
  return (
    <DefaultLayout>
      <div className="bg-[url('/img/legos.webp')] bg-cover bg-center">
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 40%)"
          opacity={0.8}
          zIndex={0}
        />
        <Container className="relative z-10 flex h-[400px] flex-col items-start justify-end space-y-4 pb-28 text-white">
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
        </Container>
      </div>
      <div className="grid grid-cols-1 gap-10 p-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </div>
    </DefaultLayout>
  );
}
