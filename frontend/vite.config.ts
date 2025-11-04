/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");

return{

  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Enable global access to Vitest APIs like `describe`, `test`, `expect`
    environment: "jsdom", //  Simulate browser environment for testing DOM-related code
    setupFiles: ["./test/setup/testSetup.tsx"], // Path to setup file for test environment configurations
    include: ["./test/**/*.{test,spec}.{ts,tsx}"], // Path to test files
    coverage: {
      reporter: ["text", "json", "html"], // Report coverage in text, json, and html formats
      exclude: ["node_modules/", "test/"], // Exclude files from coverage report
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "test"),
      "@src": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  server: {
    proxy: {
      "/api": {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
}
});

