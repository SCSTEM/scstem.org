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
            label: "Clubs",
            items: [
              {
                label: "FLL (Age 4-16)",
                to: "/clubs/fll",
              },
              {
                label: "FTC (Age 12-18)",
                to: "/clubs/ftc",
              },
              {
                label: "FRC (Age 14-18)",
                to: "https://biohazard4050.org",
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
          customCss: require.resolve("./src/css/custom.css"),
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
    [
      require.resolve("@docusaurus/plugin-ideal-image"),
      { disableInDev: false },
    ],
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
