import type { StaticImport } from "@/components/Image";

import fivesLogo from "@/image/sponsor/fives.svg";
import jlgLogo from "@/image/sponsor/jlg.svg";
import journalyticLogo from "@/image/sponsor/journalytic.svg";
import workshopeLogo from "@/image/sponsor/workshope.png";
import ybLogo from "@/image/sponsor/yb-dark.png";

export enum SponsorLevel {
  Friend = "Friend",
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
}

export interface Sponsor {
  name: string;
  level: SponsorLevel;
  logo?: string | StaticImport;
  url?: string;
  description?: string;
  sub?: string;
  supportSince?: number;
}

export const Sponsors: Sponsor[] = [
  {
    name: "JLG",
    level: SponsorLevel.Platinum,
    logo: jlgLogo,
    url: "https://www.jlg.com/",
    supportSince: 2013,
  },
  // {
  //   name: "Wellspan",
  //   level: SponsorLevel.Platinum,
  //   logo: require("@site/static/img/sponsors/wellspan.png"),
  //   url: "https://www.wellspan.org/",
  //   supportSince: 2022,
  // },
  // {
  //   name: "VFW",
  //   level: SponsorLevel.Platinum,
  //   logo: "/img/sponsors/vfw.png",
  //   url: "https://www.vfw1599.org/",
  //   sub: "Chambersburg VFW Post 1599",
  //   supportSince: 2022,
  // },
  {
    name: "Fives",
    level: SponsorLevel.Platinum,
    logo: fivesLogo,
    url: "https://www.fivesgroup.com/",
    supportSince: 2022,
  },
  {
    name: "The WorkShope",
    level: SponsorLevel.Gold,
    logo: workshopeLogo,
    url: "https://www.theworkshope.com/",
    supportSince: 2021,
  },
  {
    name: "Y.B. Welding",
    level: SponsorLevel.Gold,
    logo: ybLogo,
    url: "https://www.ybwelding.com/",
    supportSince: 2018,
  },
  {
    name: "Journalytic",
    level: SponsorLevel.Gold,
    logo: journalyticLogo,
    url: "https://journalytic.com/",
    supportSince: 2024,
  },
  // {
  //   name: "Test Sponsor",
  //   level: SponsorLevel.Gold,
  //   url: "https://example.com/",
  //   supportSince: 2024,
  // },
].sort((a, b) => (a.supportSince < b.supportSince ? -1 : 1));
