import type { ReactNode } from "react";

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

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ name: CalendarName }>;
}): Promise<ReactNode> {
  const { name } = await params;
  const src = calendars[name];

  return (
    <Calendar
      noTitle
      calendars={[
        {
          src,
          color: name === "frc" ? CalColor.Green : CalColor.Gold,
        },
      ]}
    />
  );
}
