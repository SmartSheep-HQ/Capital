import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://smartsheep.studio",
  integrations: [tailwind(), react(), sitemap()],
  adapter: node({
    mode: "standalone"
  })
});