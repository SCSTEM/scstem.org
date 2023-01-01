import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import GenericForm from "../components/GenericForm";
import { Text } from "@mantine/core";

export default function Contact(): JSX.Element {
  return (
    <DefaultLayout>
      <div className="mx-auto w-4/5 py-10 md:w-[500px] lg:w-[800px]">
        <Text size="lg">
          This form is currently under construction. Use the Get Involved form
          instead.
        </Text>

        <GenericForm heading="Contact Us" name email message disabled />
      </div>
    </DefaultLayout>
  );
}
