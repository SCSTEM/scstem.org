import React from "react";
import Button from "../../components/Button";
import DefaultLayout from "../../layouts/Default";
import HeroHeader from "@site/src/components/home/hero/Header";

export default function Biohazard(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader className="bg-[url('/img/people-cheering.webp')] bg-cover bg-bottom text-white">
        <h1 className="mx-auto h-28 w-4/5 text-center text-4xl drop-shadow-md md:w-1/2 md:text-5xl">
          Biohazard
        </h1>
        <div className="mt-10 flex justify-center space-x-2">
          {/*}
            <Button href="/about" value="About Us" />
            <Button href="/sponsors" value="Our Sponsors" />
            <Button href="/blog" value="Our Blog" />
          {*/}
        </div>
      </HeroHeader>
      <main className="space-y-32 border-0 border-t-2 border-solid border-green border-opacity-20 p-48 dark:border-opacity-10">
        Coming Soon!
      </main>
    </DefaultLayout>
  );
}
