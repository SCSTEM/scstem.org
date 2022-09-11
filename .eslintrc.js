/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  root: true,
  plugins: ["@docusaurus", "@typescript-eslint"],
  extends: ["plugin:@docusaurus/recommended"],
  parser: "@typescript-eslint/parser",
};

module.exports = config;
