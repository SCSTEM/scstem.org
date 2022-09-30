import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import CalendarFrame, { CalColor } from "@site/src/components/Calendar";

export default function BiohazardCalendar(): JSX.Element {
  return (
    <DefaultLayout>
      <CalendarFrame
        calendars={[
          {
            src: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
            color: CalColor.Green,
          },
        ]}
      />
    </DefaultLayout>
  );
}