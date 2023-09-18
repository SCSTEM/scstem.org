import { Title } from "@mantine/core";

type Props = {
  children: React.ReactNode;
} & (
  | {
      alt?: false;
      title: string;
    }
  | {
      alt?: true;
      title?: never;
    }
);

export default function Section({ children, alt, title }: Props): JSX.Element {
  if (alt)
    return (
      <section className="space-y-4 bg-zinc-200 dark:bg-black shadow-inner p-8">
        <div className="md:max-w-screen-xl mx-auto md:px-12">{children}</div>
      </section>
    );

  return (
    <section className="p-8 md:max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-black mb-6 text-center md:text-left font-heading">
        {title}
      </h2>
      {children}
    </section>
  );
}
