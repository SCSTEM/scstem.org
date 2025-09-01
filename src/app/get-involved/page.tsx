import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PatternBackground } from "@/components/PatternBackground";

export const metadata: Metadata = {
  title: "Get Involved",
};

export default function GetInvolved(): ReactNode {
  return (
    <PatternBackground pattern={"circuit"}>
      <div className="h-[1800px]" style={{ colorScheme: "light" }}>
        <iframe
          title="Get Involved Form"
          className="px-4 py-8 md:p-8 size-full bg-transparent!"
          src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
        >
          Loading…
        </iframe>
      </div>
    </PatternBackground>
  );
}
