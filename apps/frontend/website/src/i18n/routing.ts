import {
  DEFAULT_LOCALE,
  LOCALES,
  localizedRoutes,
  type Locale,
  type RouteKey,
} from "./localized-routes";

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
  const segments = pathname?.split("/").filter(Boolean);
  const firstSegment = segments?.[0];

  if (LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Remove o prefixo de locale da URL
 */
export function removeLocalePrefix(pathname: string): string {
  const segments = pathname?.split("/").filter(Boolean);
  const firstSegment = segments?.[0];

  // Remove sempre que houver um segmento de locale (inclusive o DEFAULT_LOCALE)
  if (LOCALES.includes(firstSegment as Locale)) {
    const without = pathname.replace(`/${firstSegment}`, "") || "/";
    return without === "" ? "/" : without;
  }

  return pathname || "/";
}

/**
 * Encontra a chave da rota baseado no pathname
 */
export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  const normalizePathname = (p: string) => {
    if (!p) return "/";
    if (p === "/") return "/";
    return p.replace(/\/+$/, "");
  };

  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPath(normalized);

  const candidates = new Set<string>([
    normalized,
    normalizePathname(removeLocalePrefix(normalized)),
  ]);

  for (const [key, routes] of Object.entries(localizedRoutes)) {
    const expected = normalizePathname(routes[locale]);
    for (const candidate of candidates) {
      if (candidate === expected) return key as RouteKey;
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
