/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", "[data-theme='dark']"],
  corePlugins: { preflight: false },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
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
};
