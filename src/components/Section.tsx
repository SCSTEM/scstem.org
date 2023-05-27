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
        <div className="lg:max-w-screen-xl mx-auto lg:px-12">{children}</div>
      </section>
    );

  return (
    <section className="p-8 lg:max-w-screen-2xl mx-auto">
      <Title
        order={2}
        className="text-2xl font-black mb-6 text-center lg:text-left"
      >
        {title}
      </Title>
      {children}
    </section>
  );
}
