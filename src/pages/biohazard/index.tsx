import React from "react";
import Button from "../../components/Button";
import DefaultLayout from "../../layouts/Default";

export default function Biohazard(): JSX.Element {
  return (
    <DefaultLayout>
      <header className="h-[40vh] bg-[url('/img/people-cheering.webp')] bg-cover bg-bottom">
        <div className="flex flex-col md:px-48 md:pt-36">
          <h1 className="mx-auto text-xl text-white drop-shadow-md md:text-5xl">
            Biohazard
          </h1>
          <div className="mx-auto mt-16 flex space-x-2">
            {/*}
            <Button href="/about" value="About Us" />
            <Button href="/sponsors" value="Our Sponsors" />
            <Button href="/blog" value="Our Blog" />
  {*/}
          </div>
        </div>
      </header>
      <main className="space-y-32 border-0 border-t-2 border-solid border-green border-opacity-20 p-48 dark:border-opacity-10">
        Coming Soon!
      </main>
    </DefaultLayout>
  );
}
