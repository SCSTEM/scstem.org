import React from "react";

import CalendarFrame, { CalColor } from "@site/src/components/Calendar";
import DefaultLayout from "@site/src/layouts/Default";

export default function Calendar(): JSX.Element {
  return (
    <DefaultLayout>
      <CalendarFrame
        noTitle
        calendars={[
          {
            src: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
            color: CalColor.Gold,
          },
        ]}
      />
    </DefaultLayout>
  );
}
