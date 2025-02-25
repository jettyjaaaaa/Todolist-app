import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/todolistapp/",
 plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: false, // Ensures all CSS is included in one file
  }
});
