import { defineManifest } from "@crxjs/vite-plugin";
import { version } from "./package.json";

export const manifest = defineManifest({
  manifest_version: 3,
  name: "Enhance GitHub Timestamps",
  version,
  permissions: ["tabs", "storage"],
  content_scripts: [
    {
      matches: ["https://github.com/*"],
      js: ["/src/01_frameworks-driver.layer/contents/contents.ts"],
      run_at: "document_end",
    },
  ],
  background: {
    service_worker: "/src/01_frameworks-driver.layer/background/background.ts",
  },
  options_page: "options.html",
  web_accessible_resources: [
    {
      resources: ["assets/*"],
      matches: ["https://github.com/*"],
    },
  ],
});
