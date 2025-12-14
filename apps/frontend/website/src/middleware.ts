import { getLocaleFromPath } from "@/i18n/routing";
import { defineMiddleware } from "astro:middleware";
import { DEFAULT_LOCALE } from "./i18n/localized-routes";

export const onRequest = defineMiddleware((context, next) => {
  const locale = getLocaleFromPath(context.url.pathname);

  // Adiciona o locale ao locals para acesso nas páginas
  context.locals.locale = locale;
  context.locals.isDefaultLocale = locale === DEFAULT_LOCALE;

  return next();
});
