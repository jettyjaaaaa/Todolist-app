import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base: "/todolistapp/", // Ensure this matches your Nginx path
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 5173, // This is for local development, not used in Docker
  },
});
