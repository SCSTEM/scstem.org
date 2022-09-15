/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", "[data-theme='dark']"],
  corePlugins: { preflight: false },
  plugins: ["@tailwindcss/typography"],
};
