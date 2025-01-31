import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: mode === "production" ? "/GoodNeighbour/" : "/",
    build: {
      outDir: "dist",
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8003",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
