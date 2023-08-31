// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/* eslint-disable */

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "South Central STEM Collective",
  tagline: "South Central Pennsylvania's 'STEM Central'",
  url: "https://scstem.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/svg/logo-color.svg",
  customFields: {
    turnstileSiteKey: process.env.TS_SITE_KEY || "1x00000000000000000000AA",
    isProductionBuild: process.env.CF_PAGES_BRANCH === "main" ? true : false,
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/meta.png",
      metadata: [
        {
          name: "keywords",
          content: [
            "robotics",
            "makerspace",
            "STEM",
            "community",
            "Chambersburg",
            "Pennsylvania",
            "FIRST Robotics",
            "engineering",
            "programming",
            "computers",
            "technology",
            "hands on",
            "education",
            "workspace",
            "tools",
            "Lego",
            "drive robots",
            "kids",
            "club",
            "homeschool",
            "after school",
            "Franklin County",
          ].join(", "),
        },
      ],
      navbar: {
        hideOnScroll: true,
        title: "South Central STEM Collective",
        logo: {
          src: "img/svg/logo-color.svg",
        },
        items: [
          {
            label: "About",
            to: "/about",
          },
          {
            label: "Sponsors",
            to: "/sponsors",
          },
          {
            label: "Wiki",
            to: "/wiki",
          },
          {
            type: "dropdown",
            label: "Clubs",
            items: [
              {
                label: "FLL (Age 9-16)",
                to: "/clubs/fll",
              },
              {
                label: "FTC (Age 12-18)",
                to: "/clubs/ftc",
              },
              {
                label: "FRC (Age 14-18)",
                to: "/biohazard",
              },
            ],
          },
          {
            label: "Get Involved",
            to: "/get-involved",
            position: "right",
            className: "navbar-cta-button",
          },
        ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} South Central STEM Collective.`,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
      },
      zoom: {
        selector: ".markdown img, .zoomable img",
      },
    }),

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "wiki",
          sidebarPath: require.resolve("./sidebars.js"),
          path: "./wiki",
        },
        theme: {
          customCss: [require.resolve("./src/styles/globals.css")],
        },
        gtag: {
          trackingID: "G-3TPD3DLYBR",
        },
        sitemap: {
          changefreq: "monthly",
          priority: 0.5,
          ignorePatterns: ["/tags/**", "/team/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
    [
      require.resolve("@docusaurus/plugin-ideal-image"),
      {
        disableInDev: false,
        sizes: [576, 768, 992, 1200, 1400, 2000],
        name: "img/_optimized/[name].[hash:hex:7].[width].[ext]",
      },
    ],
    async function tailwind(_context, _options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};

module.exports = config;
