import React from "react";
import DefaultLayout from "@site/src/layouts/Default";

export default function GetInvolved(): JSX.Element {
  return (
    <DefaultLayout>
      <iframe
        className="h-screen w-full bg-[url('/svg/circuit-board-light.svg')] dark:bg-[url('/svg/circuit-board-dark.svg')] md:h-full"
        src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
      >
        Loading…
      </iframe>
    </DefaultLayout>
  );
}
