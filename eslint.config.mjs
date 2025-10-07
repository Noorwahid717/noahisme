import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import prettier from "eslint-config-prettier";

const typescriptRules = tseslint.configs.recommended.rules ?? {};
const astroFlat = astro.configs["flat/recommended"];

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module"
      },
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      ...typescriptRules,
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"]
      }
    },
    plugins: {
      astro
    },
    rules: {
      ...(astroFlat?.rules ?? {})
    }
  },
  prettier
];
