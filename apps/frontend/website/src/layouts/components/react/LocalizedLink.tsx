import type { Locale, RouteKey } from "@/i18n/localized-routes";
import { getLocaleFromPath, getLocalizedRoute } from "@/i18n/routing";
import type { ReactNode } from "react";
import * as React from "react";

interface LocalizedLinkProps {
  route: RouteKey;
  locale?: Locale;
  children: ReactNode;
  className?: string;
  currentPath?: string;
}

export function LocalizedLink({
  route,
  locale,
  children,
  className = "",
  currentPath,
}: LocalizedLinkProps) {
  // Se locale não for fornecido, usa o locale da URL atual
  const finalLocale =
    locale || (currentPath ? getLocaleFromPath(currentPath) : "pt");
  const href = getLocalizedRoute(route, finalLocale);

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
