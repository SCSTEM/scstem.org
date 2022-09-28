import React from "react";
import DefaultLayout from "@site/src/layouts/Default";
import Calendar, { CalColor } from "@site/src/components/Calendar";

export default function GetInvolved(): JSX.Element {
  return (
    <DefaultLayout>
      <iframe
        className="w-full h-full bg-[url('/svg/circuit-board-light.svg')] dark:bg-[url('/svg/circuit-board-dark.svg')]"
        src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
      >
        Loading…
      </iframe>
    </DefaultLayout>
  );
}
