import {
  DEFAULT_LOCALE,
  LOCALES,
  localizedRoutes,
  type Locale,
  type RouteKey,
} from "@/i18n/localized-routes";

/**
 * Obtém a rota localizada para um locale específico
 */
export function getLocalizedRoute(route: RouteKey, locale: Locale): string {
  return localizedRoutes[route][locale];
}

/**
 * Obtém o locale da URL atual
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Remove o prefixo de locale da URL
 */
export function removeLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPath(pathname);

  if (locale === DEFAULT_LOCALE) {
    return pathname;
  }

  return pathname.replace(`/${locale}`, "") || "/";
}

/**
 * Encontra a chave da rota baseado no pathname
 */
export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  const cleanPath = removeLocalePrefix(pathname);
  const locale = getLocaleFromPath(pathname);

  for (const [key, routes] of Object.entries(localizedRoutes)) {
    if (routes[locale] === pathname) {
      return key as RouteKey;
    }
  }

  return null;
}

/**
 * Alterna entre locales mantendo a mesma rota
 */
export function switchLocale(
  currentPath: string,
  targetLocale: Locale,
): string {
  const routeKey = getRouteKeyFromPath(currentPath);

  if (!routeKey) {
    // Se não encontrar a rota, retorna a home no locale de destino
    return getLocalizedRoute("home", targetLocale);
  }

  return getLocalizedRoute(routeKey, targetLocale);
}

/**
 * Gera todas as versões localizadas de uma rota (útil para hreflang)
 */
export function getAllLocalizedVersions(
  route: RouteKey,
): Record<Locale, string> {
  return LOCALES.reduce(
    (acc, locale) => {
      acc[locale] = getLocalizedRoute(route, locale);
      return acc;
    },
    {} as Record<Locale, string>,
  );
}
