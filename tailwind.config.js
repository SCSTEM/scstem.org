/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", "[data-theme='dark']"],
  corePlugins: { preflight: false },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        gray: "var(--gray)",
        green: "var(--green)",
        orange: "var(--orange)",
        dark: "var(--dark)",
        blue: "var(--blue)",
        white: "var(--white)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#facc15",
          secondary: "#353c45",
          accent: "#171717",
          neutral: "#171717",
          "base-100": "#fafafa",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#f97316",
          error: "#dc2828",

          "--rounded-btn": "1.25rem",
          "--btn-text-case": "none",
        },
      },
      {
        dark: {
          primary: "#facc15",
          secondary: "#22c55e",
          accent: "#facc15",
          neutral: "#4b5563",
          "base-100": "#171717",
          info: "#3b82f6",
          success: "#22c55e",
          orange: "#f97316",
          error: "#dc2828",

          "--rounded-btn": "1.25rem",
          "--btn-text-case": "none",
        },
      },
    ],
    darkTheme: "dark",
  },
};
