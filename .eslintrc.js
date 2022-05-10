module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    //"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-alert": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-unused-vars": "off",
    "import/no-unresolved": "off",
    "import/extensions": ["warn", "never"],
  },
};
