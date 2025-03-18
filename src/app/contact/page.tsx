import type { ReactNode } from "react";

import { ContactForm } from "@/components/forms/ContactForm";

export default function Contact(): ReactNode {
  return (
    <div className="md:max-w-screen-xl md:mx-auto md:w-1/2 m-4 flex flex-col justify-center gap-y-6">
      <h1 className="text-4xl font-bold md:text-4xl mb-0 text-foreground text-center font-heading">
        Contact us
      </h1>
      <ContactForm name="Contact Us" />
    </div>
  );
}
