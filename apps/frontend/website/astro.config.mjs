import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig, envField } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";

const adapter =
  process.env.ASTRO_ADAPTER === "node"
    ? (await import("@astrojs/node")).default({ mode: "standalone" })
    : vercel();

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: config.site.base_url,
  base: config.site.base_path,
  trailingSlash: "ignore",
  env: {
    schema: {
      FLAGS_ENVIRONMENT_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      FLAGS_API_URL: envField.string({
        context: "client",
        access: "public",
      }),
      DISCORD_WEBHOOK_URL: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_API_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_AUTH_DOMAIN: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_STORAGE_BUCKET: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_MESSAGING_SENDER_ID: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_APP_ID: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_MEASUREMENT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      FIREBASE_SERVICE_ACCOUNT_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },

  image: {
    service: sharp(),
  },

  server: {
    host: true,
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["curator.local"],
      hmr: {
        // When behind nginx (port 80), the HMR WebSocket client must connect
        // to port 80, not the internal container port (4003)
        clientPort: 80,
      },
    },
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

  adapter,
});
