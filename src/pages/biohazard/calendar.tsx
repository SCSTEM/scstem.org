import React from "react";
import CalendarFrame, { CalColor } from "@site/src/components/Calendar";
import BiohazardLayout from "@site/src/layouts/Biohazard";

export default function BiohazardCalendar(): JSX.Element {
  return (
    <BiohazardLayout>
      <CalendarFrame
        calendars={[
          {
            src: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
            color: CalColor.Green,
          },
        ]}
      />
    </BiohazardLayout>
  );
}
