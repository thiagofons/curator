export const APP_ROUTES = {
  COMMON: {
    sections: {
      NAVBAR: "navbar",
      FOOTER: "footer",
      CTA: "cta",
      DOWNLOAD: "download",
    },
  },
  HOME: {
    path: "/",
    sections: {
      HERO: "hero",
      SOCIAL_MEDIA_VS_CURATOR: "social_media_vs_curator",
      LEARN_FROM_THE_SOURCE: "learn_from_the_source",
      BUILD_IN_COMMUNITY: "build_in_community",
      FAQ: "faq",
      OPEN_SOURCE: "open_source",
      COME_TOGETHER: "come_together",
      PROBLEM: "problem",
    },
  },
  GET_STARTED: {
    path: "/get-started",
  },
} as const;
