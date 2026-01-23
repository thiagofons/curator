import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig, envField } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";

import vercel from "@astrojs/vercel";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: config.site.base_url,
  base: config.site.base_path,
  trailingSlash: "ignore",

  env: {
    schema: {
      FLAGSMITH_ENV_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      DISCORD_WEBHOOK_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

  image: {
    service: sharp(),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: ["en", "pt-br"],
    defaultLocale: "pt-br",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
    partytown(),
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },

  adapter: vercel(),
});
