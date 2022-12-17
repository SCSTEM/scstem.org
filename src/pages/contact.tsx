import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import GenericForm from "../components/GenericForm";

export default function Contact(): JSX.Element {
  return (
    <DefaultLayout>
      <div className="mx-6 mt-10 w-full md:mx-auto md:w-[500px] lg:w-[800px]">
        <GenericForm id="contact" heading="Contact Us" name email message />
      </div>
    </DefaultLayout>
  );
}