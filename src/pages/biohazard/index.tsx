import React from "react";
import Button from "../../components/Button";
import DefaultLayout from "../../layouts/Default";

export default function Biohazard(): JSX.Element {
  return (
    <DefaultLayout>
      <header className="h-[40vh] bg-[url('/img/people-cheering.webp')] bg-cover bg-bottom">
        <div className="flex flex-col md:pt-36 md:px-48">
          <h1 className="text-xl md:text-5xl mx-auto drop-shadow-md text-white">
            Biohazard
          </h1>
          <div className="mt-16 mx-auto flex space-x-2">
            <Button href="/about" value="About Us" />
            <Button href="/sponsors" value="Our Sponsors" />
            <Button href="/blog" value="Our Blog" />
          </div>
        </div>
      </header>
      <main className="border-solid border-0 border-t-2 border-opacity-20 border-green dark:border-opacity-10 p-48 space-y-32">
        Coming Soon!
      </main>
    </DefaultLayout>
  );
}
