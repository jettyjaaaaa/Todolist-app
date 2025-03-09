import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base: "/todolistapp/", 
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    host: "0.0.0.0", 
    port: 5173, 
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://todolist.jettyjaaaaa.space",
        changeOrigin: true,
        secure: true,
      }
    } 
  },
});
