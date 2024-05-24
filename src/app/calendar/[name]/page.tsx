import { CalColor, Calendar } from "@/components/Calendar";

type CalendarName = "frc" | "sc2";

const calendars: Record<CalendarName, string> = {
  frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
  sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

export async function generateStaticParams(): Promise<
  { name: CalendarName }[]
> {
  return [{ name: "frc" }, { name: "sc2" }];
}

export default function CalendarPage({
  params,
}: {
  params: { name: CalendarName };
}): JSX.Element {
  const src = calendars[params.name];

  return (
    <Calendar
      noTitle
      calendars={[
        {
          src,
          color: params.name === "frc" ? CalColor.Green : CalColor.Gold,
        },
      ]}
    />
  );
}
