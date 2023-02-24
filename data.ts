export enum SponsorLevel {
  Supporter = "STEM Supporter",
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
  Ultimate = "Ultimate",
}

export interface Sponsor {
  name: string;
  level: SponsorLevel;
  logo?: string;
  url?: string;
  description?: string;
  darkLogo?: string;
  sub?: string;
  supportSince?: number;
}

export const Sponsors: Sponsor[] = [
  {
    name: "JLG",
    level: SponsorLevel.Platinum,
    logo: "/img/sponsors/jlg.svg",
    url: "https://www.jlg.com/",
    supportSince: 2013,
  },
  {
    name: "Wellspan",
    level: SponsorLevel.Platinum,
    logo: "/img/sponsors/wellspan.png",
    url: "https://www.wellspan.org/",
    supportSince: 2022,
  },
  {
    name: "VFW",
    level: SponsorLevel.Platinum,
    logo: "/img/sponsors/vfw.png",
    url: "https://www.vfw1599.org/",
    sub: "Chambersburg VFW Post 1599",
    supportSince: 2022,
  },
  {
    name: "Fives",
    level: SponsorLevel.Platinum,
    logo: "/img/sponsors/fives.svg",
    url: "https://www.fivesgroup.com/",
    supportSince: 2022,
  },
  {
    name: "The WorkShope",
    level: SponsorLevel.Gold,
    logo: "/img/sponsors/workshope.png",
    url: "https://www.theworkshope.com/",
    supportSince: 2021,
  },
  {
    name: "Y.B. Welding",
    level: SponsorLevel.Gold,
    logo: "/img/sponsors/yb-light.png",
    darkLogo: "/img/sponsors/yb-dark.png",
    url: "https://www.wellspan.org/",
    supportSince: 2018,
  },
].sort((a, b) => (a.supportSince < b.supportSince ? -1 : 1));
