import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://smartsheep.studio",
  integrations: [tailwind(), react(), sitemap()],
  adapter: cloudflare(),
  redirects: {
    "/p/[...slug]": "/posts/[...slug]",
  },
});
