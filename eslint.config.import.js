import importPlugin from "eslint-plugin-import";
import path from "path";

export default {
  plugins: {
    import: importPlugin,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: path.resolve("./tsconfig.json"),
      },
    },
  },
  rules: {
    "import/no-unresolved": "error",
    "import/order": ["warn", { "newlines-between": "always" }],
  },
};
