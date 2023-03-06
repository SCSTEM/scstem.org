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
  logo?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  url?: string;
  description?: string;
  darkLogo?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
    logo: require("./static/img/sponsors/wellspan.png"),
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
    logo: require("./static/img/sponsors/workshope.png"),
    url: "https://www.theworkshope.com/",
    supportSince: 2021,
  },
  {
    name: "Y.B. Welding",
    level: SponsorLevel.Gold,
    logo: require("./static/img/sponsors/yb-light.png"),
    darkLogo: require("./static/img/sponsors/yb-dark.png"),
    url: "https://www.ybwelding.com/",
    supportSince: 2018,
  },
].sort((a, b) => (a.supportSince < b.supportSince ? -1 : 1));
