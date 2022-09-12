import LandingLayout from "../layouts/Landing";
import React from "react";

export default function GetInvolved(): JSX.Element {
  return (
    <LandingLayout>
      <iframe
        className="h-[1000px]"
        src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
      >
        Loading…
      </iframe>
    </LandingLayout>
  );
}
