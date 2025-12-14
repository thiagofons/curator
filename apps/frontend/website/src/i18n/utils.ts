import { defaultLang, showDefaultLang, ui } from "./ui";

// Nota: manter este arquivo livre de dependências de DOM; útil em SSR e em testes.

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split("/");
  if (lang! in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(
    key: keyof (typeof ui)[typeof defaultLang],
  ): (typeof ui)[typeof defaultLang][typeof key] {
    return ((ui[lang] as Record<string, string>)[key] ??
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
