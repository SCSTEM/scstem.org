/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", "[data-theme='dark']"],
  corePlugins: { preflight: false },
  plugins: ["@tailwindcss/typography"],
  theme: {
    extend: {
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
};
