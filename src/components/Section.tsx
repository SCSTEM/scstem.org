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
        <div className="md:max-w-screen-lg mx-auto md:px-12">{children}</div>
      </section>
    );

  return (
    <section className="px-6 py-10 md:max-w-screen-xl mx-auto">
      <Title order={3}>{title}</Title>
      <div className="mt-6">{children}</div>
    </section>
  );
}
