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
    supportSince: 2022,
    description:
      "Reprehenderit nulla eiusmod duis deserunt officia aute quis. Reprehenderit nulla eiusmod duis deserunt officia aute quis. Reprehenderit nulla eiusmod duis deserunt officia aute quis.",
  },
  {
    name: "Wellspan",
    level: SponsorLevel.Platinum,
    logo: "/img/sponsors/wellspan.png",
    url: "https://www.wellspan.org/",
    supportSince: 2022,
    description:
      "Reprehenderit nulla eiusmod duis deserunt officia aute quis. Reprehenderit nulla eiusmod duis deserunt officia aute quis. Reprehenderit nulla eiusmod duis deserunt officia aute quis.",
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
    name: "VFW",
    level: SponsorLevel.Gold,
    logo: "",
    url: "https://www.vfw1599.org/",
    sub: "Chambersburg VFW Post 1599",
    supportSince: 2022,
  },
  {
    name: "Wellspan",
    level: SponsorLevel.Supporter,
    logo: "/img/sponsors/wellspan.png",
    url: "https://www.wellspan.org/",
    supportSince: 2022,
    description:
      "Reprehenderit nulla eiusmod duis deserunt officia aute quis. Reprehenderit nulla eiusmod duis deserunt officia aute quis. Reprehenderit nulla eiusmod duis deserunt officia aute quis.",
  },
  {
    name: "VFW",
    level: SponsorLevel.Silver,
    logo: "/img/sponsors/vfw.png",
    url: "https://www.vfw1599.org/",
    sub: "Chambersburg VFW Post 1599",
    supportSince: 2022,
  },
  {
    name: "VFW",
    level: SponsorLevel.Bronze,
    logo: "",
    url: "https://www.vfw1599.org/",
    sub: "Chambersburg VFW Post 1599",
    supportSince: 2022,
  },
];
