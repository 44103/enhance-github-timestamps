import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";

import { manifest } from "./manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        options: "options.html",
      },
    },
  },
});
