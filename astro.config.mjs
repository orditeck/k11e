import { defineConfig, passthroughImageService, envField } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  trailingSlash: "never",
  integrations: [react(), markdoc({ allowHTML: true }), tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  build: {
    assets: "_assets",
    format: "preserve",
  },
  image: {
    service: passthroughImageService(),
  },
  adapter: cloudflare(),
  experimental: {
    env: {
      schema: {
        ANTHROPIC_API_KEY: envField.string({ context: "server", access: "secret" }),
      }
    }
  },
  vite: {
    ssr: {
      external: ['node:crypto'],
    },
  },
});
