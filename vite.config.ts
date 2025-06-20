/// <reference types="node" />
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = Object.fromEntries(
    Object.entries(loadEnv(mode, process.cwd())).map(([key, val]) => [
      key.replace(/^VITE_/, ""),
      val,
    ])
  );
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 3000,
    },
    define: {
      "process.env": env,
    },
    css: {
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]", // scoped style naming
      },
      preprocessorOptions: {
        scss: {
          additionalData: "",
        },
      },
    },
  };
});
