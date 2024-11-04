import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Disable no-namespace rule
      "@typescript-eslint/no-namespace": "off",

      // Common TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      // General ESLint rules
      // "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off", // Use TypeScript's no-unused-vars instead
      "prefer-const": "error",
      eqeqeq: ["error", "always"],

      // Import rules
      "import/prefer-default-export": "off",
      "import/no-default-export": "off",

      // Error prevention
      "no-var": "error",
      "no-extra-semi": "error",
      "no-irregular-whitespace": "error",

      // Code style
      "max-len": [
        "warn",
        {
          code: 100,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "no-multiple-empty-lines": ["error", { max: 1 }],
    },
  },
);
