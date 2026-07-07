import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "coverage/**", "public/models/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/no-autofocus": "off",
    },
  },
];

export default eslintConfig;
