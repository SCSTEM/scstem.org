import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import GenericForm from "../components/GenericForm";

export default function Contact(): JSX.Element {
  return (
    <DefaultLayout>
      <div className="mx-auto w-4/5 py-10 md:w-[500px] lg:w-[800px]">
        <GenericForm heading="Contact Us" name email message />
      </div>
    </DefaultLayout>
  );
}
