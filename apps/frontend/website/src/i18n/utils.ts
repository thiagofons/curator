import { defaultLang, showDefaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split("/");
  if (lang! in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang?: keyof typeof ui) {
  const resolvedLang = (() => {
    if (lang) return lang;

    // 1) SSR via Astro (disponível como globalThis.Astro during Astro render)
    try {
      const maybeAstro = (globalThis as any).Astro;
      if (maybeAstro && maybeAstro.request) {
        return getLangFromUrl(new URL(maybeAstro.request.url));
      }
    } catch {
      /* ignore */
    }

    // 2) Client-side fallback (window.location)
    try {
      if (typeof window !== "undefined") {
        return getLangFromUrl(new URL(window.location.href));
      }
    } catch {
      /* ignore */
    }

    // 3) Default
    return defaultLang;
  })();

  return function t(
    key: keyof (typeof ui)[typeof defaultLang],
  ): (typeof ui)[typeof defaultLang][typeof key] {
    return ((ui[resolvedLang] as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[
        key
      ]) as (typeof ui)[typeof defaultLang][typeof key];
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang): string {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}
