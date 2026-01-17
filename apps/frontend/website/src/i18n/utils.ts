// src/i18n/utils.ts
import { defaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");

  // Se o primeiro segmento da URL for um idioma conhecido (ex: 'en', 'es'), retorna ele
  if (lang! in ui) return lang as keyof typeof ui;

  // Se não for (ex: a URL é apenas '/'), retorna o padrão (pt)
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
