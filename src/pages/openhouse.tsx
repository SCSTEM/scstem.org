import React from "react";

import HeroHeader from "@site/src/components/HeroHeader";
import Highlight from "@site/src/components/Highlight";
import DefaultLayout from "@site/src/layouts/Default";

export default function Sponsors(): JSX.Element {
  return (
    <DefaultLayout>
      <HeroHeader img="/img/students.webp">
        <div className="flex flex-col space-y-6 text-white">
          <div className="text-5xl font-bold">
            Want to know more about <Highlight theme="dark">STEM</Highlight> and{" "}
            <Highlight theme="dark">Robots</Highlight>?
          </div>
          <div className="text-2xl">
            Join us for our open house on Thursday, March 23 (7PM-8:30) and
            Saturday, March 25 (10AM-11:30 and 1PM-3) to see what we're all
            about.
          </div>
        </div>
      </HeroHeader>
    </DefaultLayout>
  );
}
