// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/* eslint-disable */
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "South Central STEM Collective",
  tagline: "South Central Pennsylvania's 'STEM Central'",
  url: "https://scstem.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/svg/logo-color.svg",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      announcementBar: {
        id: "under_construction",
        content:
          "Our site is currently under construction, with a targeted launch date of Jan. 1st, 2023. See you then!",
        backgroundColor: "#b38200",
        textColor: "#FFFFFF",
        isCloseable: false,
      },
      navbar: {
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
            label: "FRC",
            to: "/biohazard",
            items: [
              {
                label: "About",
                to: "/biohazard/about",
              },
              {
                label: "Robots",
                to: "/biohazard/robots",
              },
              {
                label: "Meet the Team",
                to: "/biohazard/team",
              },
              {
                label: "Stats",
                to: "/biohazard/stats",
              },
            ],
          },
          {
            label: "Get Involved",
            to: "/get-involved",
            position: "right",
          },
        ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} South Central STEM Collective.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      /* scripts: [
        {
          src: "https://challenges.cloudflare.com/turnstile/v0/api.js",
          async: true,
          defer: true,
        },
      ], */
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
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-3TPD3DLYBR",
        },
        sitemap: {
          changefreq: "monthly",
          priority: 0.5,
          ignorePatterns: ["/tags/**", "/admin/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "sponsors",
        path: "./sponsors",
        routeBasePath: "sponsors",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "resources",
    //     path: "./resources",
    //     routeBasePath: "resources",
    //     sidebarPath: require.resolve("./sidebars.js"),
    //   },
    // ],
    async function tailwind(context, options) {
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
