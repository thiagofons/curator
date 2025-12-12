export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";

export const localizedRoutes = {
  home: {
    pt: "/",
    en: "/en",
  },
  about: {
    pt: "/sobre",
    en: "/en/about",
  },
  roadmaps: {
    pt: "/trilhas",
    en: "/en/roadmaps",
  },
  contact: {
    pt: "/contato",
    en: "/en/contact",
  },
  blog: {
    pt: "/blog",
    en: "/en/blog",
  },
  // Adicione mais rotas conforme necessário
} as const;

export type RouteKey = keyof typeof localizedRoutes;
