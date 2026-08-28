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

  description:
    "The South Central STEM Collective is a non-profit organization focused on building the future of STEM, right here in Franklin County, Pennsylvania.",
  /** `%s` is the page title. The homepage uses the bare site name instead. */
  titleTemplate: "%s | South Central STEM Collective",

  email: "info@scstem.org",

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

  /**
   * Public Google Calendar IDs, from `legacy/src/app/calendar/[name]/page.tsx`. The Pages
   * Function in `functions/api/calendar/` keeps its own copy — it cannot import from `src/`.
   */
  calendars: {
    frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
  },

  analytics: {
    /** GA4. Wired as a plain deferred gtag snippet in Phase 10 (D21). */
    ga4MeasurementId: "G-3TPD3DLYBR",
    /** Cloudflare Web Analytics beacon token, added in Phase 10. */
    cloudflareBeaconToken: undefined,
  },
} as const;

/** The programs the site is organized around; the key doubles as the theme name (D16). */
export const programs = {
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
} as const;
