import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/dyadzen/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.source.html",
    },
  },
});
