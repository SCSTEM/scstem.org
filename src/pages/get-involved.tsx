import React from "react";

import DefaultLayout from "@site/src/layouts/Default";

export default function GetInvolved(): JSX.Element {
  return (
    <DefaultLayout>
      <iframe
        className="h-[800px] w-full bg-[url('/img/svg/circuit-board-light.svg')] p-8 dark:bg-[url('/img/svg/circuit-board-dark.svg')] md:h-[1200px]"
        src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
      >
        Loading…
      </iframe>
    </DefaultLayout>
  );
}
