import GenericForm from "@site/src/components/GenericForm";
import DefaultLayout from "@site/src/layouts/Default";

export default function Contact(): JSX.Element {
  return (
    <DefaultLayout>
      <div className="mx-auto w-4/5 py-10 md:w-[500px] lg:w-[800px]">
        <GenericForm heading="Contact Us" name email message />
      </div>
    </DefaultLayout>
  );
}
