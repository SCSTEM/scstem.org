import GenericForm from "@site/src/components/GenericForm";
import DefaultLayout from "@site/src/layouts/Default";

export default function Contact(): JSX.Element {
  return (
    <DefaultLayout title="Contact Us">
      <main className="mx-auto w-4/5 py-10 lg:w-[500px] xl:w-[800px]">
        <GenericForm heading="Contact Us" name email message />
      </main>
    </DefaultLayout>
  );
}
