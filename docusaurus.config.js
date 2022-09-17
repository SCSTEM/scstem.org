// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

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
  favicon: "svg/logo-color.svg",

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
          alt: "My Site Logo",
          src: "svg/logo-color.svg",
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
            label: "Blog",
            to: "/blog",
          },
          {
            label: "Get Involved",
            to: "/get-involved",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Our clubs",
            items: [
              {
                label: "Biohazard",
                href: "https://frc.scstem.org",
              },
            ],
          },
          {
            title: "Find us online",
            items: [
              {
                label: "Facebook",
                href: "https://go.scstem.tech/facebook",
              },
              {
                label: "Twitter",
                href: "https://go.scstem.tech/twitter",
              },
            ],
          },
          {
            title: "Members area",
            items: [
              {
                label: "Slack",
                href: "https://go.scstem.tech/slack",
              },
              {
                label: "GitHub",
                href: "https://go.scstem.tech/github",
              },
            ],
          },
        ],
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
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "resources",
        path: "./resources",
        routeBasePath: "resources",
        sidebarPath: require.resolve("./sidebars.js"),
      },
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
