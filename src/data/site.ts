const workspaceStreet = "20 South Main Street";

export const site = {
  name: "South Central STEM Collective",
  shortName: "SC2",
  url: "https://scstem.org",

  legal:
    "SC2 is a 501(c)(3) nonprofit based in Chambersburg, PA, helping students explore STEM through hands-on learning.",
  ein: "86-2328794",
  founded: 2021,

  description:
    "South Central STEM Collective runs FIRST robotics teams for ages 9–18 in Chambersburg, PA, welcoming students from Franklin County and beyond.",
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
    county: "Franklin County",
    region: "PA",
    postalCode: "17201",
    country: "US",
    areaServed: "South-central Pennsylvania and beyond",
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
    wishlist: "/wiki/wishlist",
    sponsorPacket: "https://assets.scstem.org/documents/Sponsor-Packet-v1.pdf",
    getInvolvedForm:
      "https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform",
    wiki: "/wiki",
    directions: "/wiki/directions",
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

export type PagePath = "/" | `/${string}`;

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
  meets?: string;
  hours?: string;
  competitions?: string;
  competitionsPerSeason?: number;
  students?: string;
  mentors?: number;
  alumniMentors?: number;
}

export const ACCENTS = ["yellow", "green", "orange"] as const;
export type Accent = (typeof ACCENTS)[number];

export const PROGRAM_KEYS = ["sc2", "frc", "fll"] as const;
export type ProgramKey = (typeof PROGRAM_KEYS)[number];

export const programs = {
  sc2: {
    name: "South Central STEM Collective",
    shortName: "SC2",
    href: "/programs",
  },
  frc: {
    name: "FIRST Robotics Competition",
    shortName: "FRC",
    teamName: "Biohazard",
    teamNumber: 4050,
    since: 2012,
    ages: "14–18",
    tagline: "Design, build, and compete with a full-size robot.",
    meets:
      "Weekly from April to December; Mondays, Tuesdays, Thursdays and Saturdays from January through competition season",
    hours: "Weeknights 6:30–8:30 PM, Saturdays 10 AM–4 PM",
    competitions:
      "The Greater Pittsburgh Regional every season, plus one more event within driving range. Events run Thursday to Saturday.",
    competitionsPerSeason: 2,
    students: "10–20",
    mentors: 5,
    alumniMentors: 3,
    accent: "green",
    href: "/programs/frc",
  },
  fll: {
    name: "FIRST LEGO League",
    shortName: "FLL",
    ages: "9–16",
    tagline: "Build a LEGO® robot, solve problems, and share your ideas.",
    accent: "orange",
    href: "/programs/fll",
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
  readonly programs?: readonly ProgramTheme[];
  readonly links: readonly PanelLink[];
}

type NavSurface = "header" | "sheet" | "sheet-cta";

export interface NavLink extends Route {
  readonly panel?: Panel;
  readonly surfaces: readonly NavSurface[];
}

/** A header item with a panel and no destination of its own. */
export interface NavMenu {
  readonly label: string;
  readonly panel: Panel;
  readonly surfaces: readonly "header"[];
}

export type NavItem = NavLink | NavMenu;

const calendar = { label: "Calendar", href: "/calendar/sc2" } as const;
const frcCalendar = { label: "Biohazard calendar", href: "/calendar/frc" } as const;
const donate = { label: "Donate", href: "/donate" } as const;
const sponsors = { label: "Sponsors", href: "/sponsors" } as const;
const about = { label: "About", href: "/about" } as const;
const programsHub = { label: "Programs", href: programs.sc2.href } as const;
const robots = { label: "Season history", href: `${programs.frc.href}/robots` } as const;
const contact = { label: "Contact", href: "/contact" } as const;
const wiki = { label: "Wiki", href: site.urls.wiki } as const;

const programsPanel = {
  programs: ["fll", "frc"],
  links: [
    { ...robots, icon: "bot" },
    { ...calendar, icon: "calendar" },
  ],
} as const;

const morePanel = {
  links: [
    { ...wiki, icon: "notebook" },
    { ...contact, icon: "email" },
  ],
} as const;

export const nav = {
  primary: [
    { ...about, surfaces: ["header", "sheet"] },
    { ...programsHub, surfaces: ["header", "sheet"], panel: programsPanel },
    { ...sponsors, surfaces: ["header", "sheet"] },
    { ...calendar, surfaces: ["sheet"] },
    { ...wiki, surfaces: ["sheet"] },
    { ...contact, surfaces: ["sheet"] },
    { ...donate, surfaces: ["header", "sheet-cta"] },
    { label: "More", surfaces: ["header"], panel: morePanel },
  ],

  about,
  calendar,
  frcCalendar,
  contact,
  donate,
  programs: programsHub,
  robots,
  sponsors,
  wiki,

  cta: { label: "Get involved", href: "/get-involved" },
} as const satisfies {
  about: Route;
  calendar: Route;
  frcCalendar: Route;
  contact: Route;
  cta: Route;
  donate: Route;
  primary: readonly NavItem[];
  programs: Route;
  robots: Route;
  sponsors: Route;
  wiki: Route;
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
