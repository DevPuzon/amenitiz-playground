import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/core/api"),
      "@page": path.resolve(__dirname, "src/pages"),
      "@helper": path.resolve(__dirname, "src/core/helpers"),
      "@model": path.resolve(__dirname, "src/models"),
    },
  },
});
