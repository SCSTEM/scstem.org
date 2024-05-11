/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        disallowTypeAnnotations: false,
      },
    ],
    "tailwindcss/classnames-order": ["off"],
    "tailwindcss/no-custom-classname": ["off"],
    "@next/next/no-img-element": ["off"],
  },
};
