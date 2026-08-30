/**
 * Every fact about the organization that is not page content, in one place. Replaces
 * `legacy/data/config.ts` and the constants that were scattered through legacy pages.
 *
 * Rule of thumb: if it belongs in prose or would change per season, it belongs in
 * `src/content/`; if it is an identifier, a URL, or an org fact, it belongs here.
 */

export const site = {
  /** Never abbreviated in headings, and `STEM` is always capitalized (DESIGN.md §1). */
  name: "South Central STEM Collective",
  /** Prose only, and only where the full name also appears on the page. */
  shortName: "SC2",
  url: "https://scstem.org",

  /** The 501(c)(3) line, as it appears in the footer and structured data. */
  legal:
    "SC2 is 501(c)(3) non-profit focused on providing STEM opportunities for students in and around Franklin County PA.",

  description:
    "The South Central STEM Collective is a non-profit organization focused on building the future of STEM, right here in Franklin County, Pennsylvania.",
  /** `%s` is the page title. The homepage uses the bare site name instead. */
  titleTemplate: "%s | South Central STEM Collective",

  email: "info@scstem.org",

  /**
   * The site-wide social card. Dimensions and alt travel with the path so `og:image:width`/
   * `height` are emitted for the fallback too — without them a scraper has to fetch all 466 KB
   * just to learn the aspect ratio before it can lay the card out.
   */
  ogImage: {
    path: "/og/default.png",
    width: 1200,
    height: 630,
    alt: "South Central STEM Collective logo over a photo of the team",
  },

  /** The favicon/app-icon set in `public/`, projected into head links, the manifest, and JSON-LD. */
  icons: {
    favicon: "/favicon.ico",
    svg: "/icon.svg",
    appleTouch: "/apple-touch-icon.png",
    png192: "/icon-192.png",
    png512: "/icon-512.png",
    maskable512: "/icon-maskable-512.png",
  },

  location: {
    workspace: "20 South Main Street, Downtown Chambersburg",
    locality: "Chambersburg",
    region: "PA",
    country: "US",
    /** The service area, as used in copy and structured data. */
    areaServed: "Franklin County, Pennsylvania",
  },

  social: {
    facebook: "https://go.scstem.tech/facebook",
    linkedin: "https://go.scstem.tech/linkedin",
    github: "https://go.scstem.tech/github",
  },

  /** External destinations, from `legacy/data/config.ts`. */
  urls: {
    donate: "https://www.paypal.com/US/fundraiser/charity/4486755",
    wishlist: "https://wiki.scstem.org/donations/wishlist",
    sponsorPacket: "https://wiki.scstem.org/donations/packet",
    getInvolvedForm:
      "https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true",
    wiki: "https://wiki.scstem.org",
    directions: "https://wiki.scstem.org/workspace/#directions",
  },

  /** Public Google Calendar IDs, from `legacy/src/app/calendar/[name]/page.tsx`. */
  calendars: {
    frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
  },

  analytics: {
    /** GA4. Wired as a plain deferred gtag snippet in Phase 10 (D21). */
    ga4MeasurementId: "G-3TPD3DLYBR",
  },
} as const;

/** A program's facts. Flat, like the content schemas (D2). */
interface Program {
  ages?: string;
  href: string;
  name: string;
  shortName: string;
  teamName?: string;
}

/**
 * The programs the site is organized around; the key doubles as the theme name (D16) and is the
 * `program` enum in `src/content.config.ts`. Typed as a total record over `ProgramKey`, so a
 * program accepted by the schema but missing here is a compile error rather than an `undefined`
 * that surfaces as a runtime throw on a page.
 */
export const PROGRAM_KEYS = ["sc2", "frc", "fll"] as const;

/** @public Consumed by the app shell and program pages from Phase 05 onward. */
export type ProgramKey = (typeof PROGRAM_KEYS)[number];

/** @public Consumed by the app shell and program pages from Phase 05 onward. */
export const programs = {
  /** The org-wide program: events and pages that are not FRC- or FLL-specific. */
  sc2: {
    name: "South Central STEM Collective",
    shortName: "SC2",
    href: "/programs",
  },
  frc: {
    name: "FIRST Robotics Competition",
    shortName: "FRC",
    teamName: "Biohazard",
    ages: "14–18",
    href: "/programs/frc",
  },
  fll: {
    name: "FIRST LEGO League",
    shortName: "FLL",
    ages: "9–16",
    href: "/programs/fll",
  },
} as const satisfies Record<ProgramKey, Program>;

export interface NavLink {
  readonly href: string;
  readonly label: string;
  /**
   * Which chrome shows this entry, and how. The desktop header and the mobile sheet carry
   * deliberately different sets (DESIGN.md §5) — Donate is a header link (`header`) and a
   * pinned sheet button (`sheet-cta`), Calendar lives in the desktop Programs panel and at
   * sheet top level — so the split is data, not a discrepancy between two hand-written lists.
   */
  /** This entry opens a disclosure panel in the header, in addition to being a link. */
  readonly panel?: boolean;
  readonly surfaces: ReadonlyArray<"header" | "sheet" | "sheet-cta">;
}

/** The org calendar, linked from the primary nav, the Programs panel, and the footer. */
const calendar = { label: "Calendar", href: "/calendar/sc2" } as const;

/**
 * @public Consumed by the app shell and the 404 page.
 *
 * The site's route inventory. Adding a route is one edit here, not four across two components.
 * The footer's columns stay curated in `Footer.astro` — they mix routes with external URLs and
 * use full program names — but reference the entries here rather than re-typing an href.
 */
export const nav = {
  primary: [
    { label: "About", href: "/about", surfaces: ["header", "sheet"] },
    { label: "Programs", href: "/programs", surfaces: ["header", "sheet"], panel: true },
    { label: "Sponsors", href: "/sponsors", surfaces: ["header", "sheet"] },
    { ...calendar, surfaces: ["sheet"] },
    { label: "Donate", href: "/donate", surfaces: ["header", "sheet-cta"] },
  ],

  /** The desktop Programs panel, and the Programs section of the footer. */
  programs: [
    { label: programs.fll.shortName, href: programs.fll.href, name: programs.fll.name },
    { label: programs.frc.shortName, href: programs.frc.href, name: programs.frc.name },
    { label: "Robots", href: "/programs/frc/robots", name: "Our competition robots" },
    { ...calendar, name: "Upcoming events" },
  ],

  calendar,

  /** The primary call to action, in the header and at the foot of the mobile sheet. */
  cta: { label: "Get involved", href: "/get-involved" },
} as const satisfies {
  calendar: { href: string; label: string };
  cta: { href: string; label: string };
  primary: ReadonlyArray<NavLink>;
  programs: ReadonlyArray<{ href: string; label: string; name: string }>;
};

/** @public Consumed by the footer and the app shell. */
export const socials = [
  { label: "Facebook", href: site.social.facebook, icon: "brand-facebook" },
  { label: "LinkedIn", href: site.social.linkedin, icon: "brand-linkedin" },
  { label: "GitHub", href: site.social.github, icon: "brand-github" },
] as const;
