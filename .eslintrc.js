/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:@docusaurus/recommended",
  ],
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
  },
};
