import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  IconBrandPaypal,
  IconFileDescription,
  IconHeartHandshake,
  IconListCheck,
  IconMail,
  IconTool,
  IconWallet,
} from "@tabler/icons-react";
import type { Metadata } from "next";

import { PatternBackground } from "@/components/PatternBackground";
import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/cards/FeatureCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { Highlight } from "@/components/spans";
import { siteConfig } from "@/data/config";
import { parseColor } from "@/styles/theme";

const donateCards: FeatureCardProps[] = [
  {
    title: "By Mail",
    body: (
      <div className="flex flex-col gap-y-4">
        <div>
          We accept checks mailed to our workspace or delivered in person at our
          community events.
        </div>
        <div>
          <div className="font-bold">Make checks payable to:</div>
          <pre>South Central STEM Collective</pre>
        </div>
        <div>
          <div className="font-bold">Mailing address:</div>
          <pre>
            South Central STEM Collective <br />
            20 South Main Street <br />
            Chambersburg, PA 17201
          </pre>
        </div>
      </div>
    ),
    icon: IconMail,
    color: "green",
    classes: {
      body: "min-h-[300px]",
    },
  },
  {
    title: "Online",
    body: (
      <div className="flex flex-col h-full">
        <div>
          You can donate online through our secure PayPal Giving Fund link.
        </div>
        <Button
          as={Link}
          target="_blank"
          className="w-full mt-auto"
          href={siteConfig.donateUrl}
          startContent={<IconBrandPaypal />}
          style={{
            backgroundColor: parseColor("blue"),
          }}
        >
          Donate
        </Button>
      </div>
    ),
    icon: IconWallet,
    color: "blue",
    badge: "via PayPal",
    classes: {
      body: "min-h-[300px]",
    },
  },
  {
    title: "Charitable Giving Fund",
    body: (
      <div className="flex flex-col h-full gap-y-3">
        <div>
          If you are already set up with a charitable giving fund, your fund may
          already have us in their database.
        </div>
        <div>
          Name: <span className="font-bold">South Central STEM Collective</span>
          <br />
          EIN: <span className="font-bold">86-2328794</span>
        </div>
        <div>
          Please reach out if we are not appearing in your fund&apos;s database.
        </div>
      </div>
    ),
    icon: IconHeartHandshake,
    color: "orange",
    classes: {
      body: "min-h-[300px]",
    },
  },
  {
    title: "In kind",
    body: (
      <div className="flex flex-col gap-y-3 h-full">
        <div>
          We accept donations of tools, materials, and equipment to keep our
          workspace stocked and our programs running.
        </div>
        <div>
          Please refer to our wishlist for our current needs and contact us to
          arrange a donation.
        </div>
        <Button
          as={Link}
          target="_blank"
          className="w-full mt-auto"
          href={siteConfig.wishlistUrl}
          startContent={<IconListCheck />}
          style={{
            backgroundColor: parseColor("red"),
          }}
        >
          Wishlist
        </Button>
      </div>
    ),
    icon: IconTool,
    color: "red",
    classes: {
      body: "min-h-[300px]",
    },
  },
  {
    title: "Corporate Sponsorship",
    body: (
      <div className="flex flex-col h-full gap-y-3">
        <div>
          Without strong corporate partnerships, we would not be able to
          continue improving our programs and workspace.
        </div>
        <div>
          Please <Link href="#questions">contact us below</Link> if you are
          interested in supporting us through a corporate sponsorship.
        </div>
      </div>
    ),
    icon: IconFileDescription,
    color: "yellow",
    classes: {
      body: "min-h-[300px]",
    },
  },
];

export const metadata: Metadata = {
  title: "Donate",
};

export default function Donate(): JSX.Element {
  return (
    <PatternBackground pattern="topography">
      <div className="md:max-w-screen-xl md:mx-auto mx-2 my-10 md:my-24 space-y-10 md:space-y-24">
        <h1 className="text-4xl font-bold md:text-5xl mb-0 text-foreground text-center font-heading">
          How you can <Highlight>support</Highlight> the mission
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          {donateCards.map((card, i) => (
            <div key={i} className="w-full md:w-auto min-h-[300px]">
              <FeatureCard key={i} {...card} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-y-6 mx-auto md:max-w-screen-lg px-6 py-5 text-center text-lg max-w-3xl">
          <div
            id="questions"
            className="relative top-[-100px] block invisible"
          ></div>
          <h2 className="heading-2 mx-auto text-center">Lets chat</h2>
          <div>We are always looking for new partners in STEM education.</div>
          <ContactForm name="Sponsor Question" className="w-full max-w-3xl" />
        </div>
      </div>
    </PatternBackground>
  );
}
