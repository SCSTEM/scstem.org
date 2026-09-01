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
    path: "/og/default.jpg",
    width: 1200,
    height: 630,
    alt:
      "The South Central STEM Collective logo over students building in the workshop, " +
      "captioned “South Central STEM Collective”",
  },

  /**
   * The FRC hero's looping footage, in `public/` rather than `src/assets/`: astro:assets has no
   * video pipeline, so the encode is a manual ffmpeg step recorded in
   * `docs/adr/0006-hero-video-encode.md` and the files ship as-is.
   */
  heroVideo: {
    mp4: "/video/biohazard/home-video.mp4",
    webm: "/video/biohazard/home-video.webm",
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
    /** How the workspace is named where a venue needs a name — an event's location, chiefly. */
    name: "South Central STEM Collective Workspace",
    workspace: "20 South Main Street, Downtown Chambersburg",
    locality: "Chambersburg",
    region: "PA",
    country: "US",
    /** The service area, as used in copy and structured data. */
    areaServed: "Franklin County, Pennsylvania",
    /** Everything we run happens here, so the calendar shows its times in this zone. */
    timeZone: "America/New_York",
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
    /** The bare form; `/get-involved` appends `?embedded=true` for the iframe it renders. */
    getInvolvedForm:
      "https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform",
    wiki: "https://wiki.scstem.org",
    directions: "https://wiki.scstem.org/workspace/#directions",
    /** The parent organization every program belongs to. */
    firstInspires: "https://www.firstinspires.org/",
    moreThanRobots: "https://info.firstinspires.org/morethanrobots",
    /** The team's introduction video, linked out rather than embedded (no third-party player). */
    teamVideo: "https://youtu.be/147CgudTur8",
  },

  /** Public Google Calendar IDs, from `legacy/src/app/calendar/[name]/page.tsx`. */
  calendars: {
    frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
  },

  analytics: {
    /**
     * GA4, loaded by `Analytics.astro` as a plain gtag snippet after `load` (D21). Cloudflare
     * Web Analytics' token is not here: it has no value to commit yet, so it comes through
     * `PUBLIC_CF_BEACON_TOKEN` in `astro.config.ts`'s env schema, set in the Pages dashboard.
     */
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

/**
 * @public Consumed by the layouts and `Seo` from Phase 05 onward.
 *
 * A program that carries a `[data-theme]` block in `global.css` (D16); the org-wide `sc2` look
 * is the default and has none.
 */
export type ProgramTheme = Exclude<ProgramKey, "sc2">;

/** A destination and the text that links to it. */
interface Route {
  readonly href: string;
  readonly label: string;
}

/** A disclosure panel's row: the link plus the one-line description under it. */
interface PanelLink extends Route {
  readonly name: string;
}

export interface NavLink extends Route {
  /** Disclosure panel this entry opens in the header, in addition to being a link. */
  readonly panel?: ReadonlyArray<PanelLink>;
  /**
   * Which chrome shows this entry, and how. The desktop header and the mobile sheet carry
   * deliberately different sets (DESIGN.md §5) — Donate is a header link (`header`) and a
   * pinned sheet button (`sheet-cta`), Calendar lives in the desktop Programs panel and at
   * sheet top level — so the split is data, not a discrepancy between two hand-written lists.
   */
  readonly surfaces: ReadonlyArray<"header" | "sheet" | "sheet-cta">;
}

/**
 * Entries that other surfaces link to by name — the footer's columns, a page's call to action —
 * are named here and spread into `primary` below, so a link never has to be found by index or
 * re-typed at the call site.
 */
const calendar = { label: "Calendar", href: "/calendar/sc2" } as const;
const donate = { label: "Donate", href: "/donate" } as const;
const sponsors = { label: "Sponsors", href: "/sponsors" } as const;

/** The Programs disclosure in the desktop header. */
const programsPanel = [
  { label: programs.fll.shortName, href: programs.fll.href, name: programs.fll.name },
  { label: programs.frc.shortName, href: programs.frc.href, name: programs.frc.name },
  { label: "Robots", href: "/programs/frc/robots", name: "Our competition robots" },
  { ...calendar, name: "Upcoming events" },
] as const;

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
    { label: "Programs", href: "/programs", surfaces: ["header", "sheet"], panel: programsPanel },
    { ...sponsors, surfaces: ["header", "sheet"] },
    { ...calendar, surfaces: ["sheet"] },
    { ...donate, surfaces: ["header", "sheet-cta"] },
  ],

  calendar,
  donate,
  sponsors,

  /** The primary call to action, in the header and at the foot of the mobile sheet. */
  cta: { label: "Get involved", href: "/get-involved" },
} as const satisfies {
  calendar: Route;
  cta: Route;
  donate: Route;
  primary: ReadonlyArray<NavLink>;
  sponsors: Route;
};

/** @public Consumed by the footer and the app shell. */
export const socials = [
  { label: "Facebook", href: site.social.facebook, icon: "brand-facebook" },
  { label: "LinkedIn", href: site.social.linkedin, icon: "brand-linkedin" },
  { label: "GitHub", href: site.social.github, icon: "brand-github" },
] as const;
