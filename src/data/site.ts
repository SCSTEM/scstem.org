const workspaceStreet = "20 South Main Street";

export const site = {
  name: "South Central STEM Collective",
  shortName: "SC2",
  url: "https://scstem.org",

  legal:
    "SC2 is a 501(c)(3) non-profit providing STEM opportunities for students in and around Franklin County, PA.",
  ein: "86-2328794",

  description:
    "South Central STEM Collective runs FIRST robotics teams and hands-on STEM programs for ages 9-18 in Franklin County, Pennsylvania.",
  // `%s` is the page title, including the homepage's offering and location.
  titleTemplate: "%s | South Central STEM Collective",

  email: "info@scstem.org",

  ogImage: {
    path: "/og/default.jpg",
    width: 1200,
    height: 630,
    alt: "The South Central STEM Collective logo over students building in the workshop, captioned “South Central STEM Collective”",
  },

  heroVideo: {
    mp4: "/video/biohazard/home-video.mp4",
    webm: "/video/biohazard/home-video.webm",
  },

  icons: {
    favicon: "/favicon.ico",
    svg: "/icon.svg",
    appleTouch: "/apple-touch-icon.png",
    png192: "/icon-192.png",
    png512: "/icon-512.png",
    maskable512: "/icon-maskable-512.png",
  },

  location: {
    name: "South Central STEM Collective Workspace",
    workspace: `${workspaceStreet}, Downtown Chambersburg`,
    street: workspaceStreet,
    locality: "Chambersburg",
    region: "PA",
    postalCode: "17201",
    country: "US",
    areaServed: "Franklin County, Pennsylvania",
    timeZone: "America/New_York",
  },

  social: {
    facebook: "https://go.scstem.tech/facebook",
    linkedin: "https://go.scstem.tech/linkedin",
    github: "https://go.scstem.tech/github",
  },

  socialProfiles: {
    facebook: "https://www.facebook.com/SCSTEM",
    linkedin: "https://www.linkedin.com/company/scstem/",
    github: "https://github.com/SCSTEM",
  },

  urls: {
    donate: "https://www.paypal.com/US/fundraiser/charity/4486755",
    wishlist: "https://wiki.scstem.org/donations/wishlist",
    sponsorPacket: "https://wiki.scstem.org/donations/packet",
    getInvolvedForm:
      "https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform",
    wiki: "https://wiki.scstem.org",
    directions: "https://wiki.scstem.org/workspace/#directions",
    firstInspires: "https://www.firstinspires.org/",
    moreThanRobots: "https://info.firstinspires.org/morethanrobots",
    teamVideo: "https://youtu.be/147CgudTur8",
  },

  calendars: {
    frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
  },

  analytics: {
    ga4MeasurementId: "G-3TPD3DLYBR",
    cfBeacon: "3f460cd5a1e7442597641c7adbe5edfe",
  },
} as const;

export type PagePath = "/" | `/${string}/`;

interface Program {
  accent?: Exclude<Accent, "yellow">;
  ages?: string;
  href: PagePath;
  name: string;
  shortName: string;
  since?: number;
  tagline?: string;
  teamName?: string;
  teamNumber?: number;
}

export const ACCENTS = ["yellow", "green", "orange"] as const;
export type Accent = (typeof ACCENTS)[number];

export const PROGRAM_KEYS = ["sc2", "frc", "fll"] as const;
export type ProgramKey = (typeof PROGRAM_KEYS)[number];

export const programs = {
  sc2: {
    name: "South Central STEM Collective",
    shortName: "SC2",
    href: "/programs/",
  },
  frc: {
    name: "FIRST Robotics Competition",
    shortName: "FRC",
    teamName: "Biohazard",
    teamNumber: 4050,
    since: 2012,
    ages: "14-18",
    tagline: "A 120-pound competition robot, built by students every season.",
    accent: "green",
    href: "/programs/frc/",
  },
  fll: {
    name: "FIRST LEGO League",
    shortName: "FLL",
    ages: "9-16",
    tagline: "LEGO® robots, table missions, and a research project.",
    accent: "orange",
    href: "/programs/fll/",
  },
} as const satisfies Record<ProgramKey, Program>;

export type ProgramTheme = Exclude<ProgramKey, "sc2">;

interface Route {
  readonly href: PagePath;
  readonly label: string;
}

interface PanelLink extends Route {
  readonly icon: string;
}

interface Panel {
  readonly programs: readonly ProgramTheme[];
  readonly links: readonly PanelLink[];
}

export interface NavLink extends Route {
  readonly panel?: Panel;
  readonly surfaces: readonly ("header" | "sheet" | "sheet-cta")[];
}

const calendar = { label: "Calendar", href: "/calendar/sc2/" } as const;
const frcCalendar = { label: "Biohazard calendar", href: "/calendar/frc/" } as const;
const donate = { label: "Donate", href: "/donate/" } as const;
const sponsors = { label: "Sponsors", href: "/sponsors/" } as const;
const about = { label: "About", href: "/about/" } as const;
const programsHub = { label: "Programs", href: programs.sc2.href } as const;
const robots = { label: "Robots", href: `${programs.frc.href}robots/` } as const;
const contact = { label: "Contact", href: "/contact/" } as const;

const programsPanel = {
  programs: ["fll", "frc"],
  links: [
    { ...robots, icon: "bot" },
    { ...calendar, icon: "calendar" },
  ],
} as const;

export const nav = {
  primary: [
    { ...about, surfaces: ["header", "sheet"] },
    { ...programsHub, surfaces: ["header", "sheet"], panel: programsPanel },
    { ...sponsors, surfaces: ["header", "sheet"] },
    { ...calendar, surfaces: ["sheet"] },
    { ...donate, surfaces: ["header", "sheet-cta"] },
  ],

  about,
  calendar,
  frcCalendar,
  contact,
  donate,
  programs: programsHub,
  robots,
  sponsors,

  cta: { label: "Get involved", href: "/get-involved/" },
} as const satisfies {
  about: Route;
  calendar: Route;
  frcCalendar: Route;
  contact: Route;
  cta: Route;
  donate: Route;
  primary: readonly NavLink[];
  programs: Route;
  robots: Route;
  sponsors: Route;
};

export const socials = [
  {
    label: "Facebook",
    href: site.social.facebook,
    profile: site.socialProfiles.facebook,
    icon: "logo--facebook",
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    profile: site.socialProfiles.linkedin,
    icon: "logo--linkedin",
  },
  {
    label: "GitHub",
    href: site.social.github,
    profile: site.socialProfiles.github,
    icon: "logo--github",
  },
] as const;
