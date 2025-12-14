import { LOCALES, type Locale } from "@/i18n/localized-routes";
import {
  getLocaleFromPath,
  getLocalizedRoute,
  getRouteKeyFromPath,
} from "@/i18n/routing";
import { Button } from "@repo/ui-web/base/button";
import * as React from "react";
import { useEffect, useState } from "react";

interface LocaleSwitcherProps {
  /**
   * O pathname atual (window.location.pathname no cliente)
   * Pode ser passado via Astro.url.pathname no servidor
   */
  initialPath?: string;
  className?: string;
}

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  initialPath,
  className = "",
}) => {
  const [currentPath, setCurrentPath] = useState(() => {
    // Prioridade: prop explicita > window > raiz
    if (typeof initialPath === "string") return initialPath;
    if (typeof window === "undefined") return "/";
    return window.location?.pathname || "/";
  });

  const currentLocale = getLocaleFromPath(currentPath);

  useEffect(() => {
    const handleLocationChange = () => {
      const next = window.location?.pathname;
      if (typeof next === "string" && next.length > 0) setCurrentPath(next);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const normalizePathname = (pathname: string) => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    return pathname.replace(/\/+$/, "");
  };

  const stripDefaultLocalePrefix = (
    pathname: string,
    defaultLocale: Locale,
  ) => {
    const normalized = normalizePathname(pathname);
    const prefix = `/${defaultLocale}`;

    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
      // Se normalized for exatamente "/pt", slice retorna "" -> fallback para "/"
      return normalized.slice(prefix.length) || "/";
    }

    return normalized;
  };

  const buildPrefixSwapPath = (pathname: string, targetLocale: Locale) => {
    const normalized = normalizePathname(pathname);
    const segments = normalized.split("/").filter(Boolean);

    const rest =
      segments.length > 0 && LOCALES.includes(segments[0] as Locale)
        ? segments.slice(1)
        : segments;

    // pt é o idioma padrão: sem prefixo
    if (targetLocale === "pt") {
      const next = rest.length ? `/${rest.join("/")}` : `/`;
      return next.replace(/\/{2,}/g, "/");
    }

    const next = rest.length
      ? `/${targetLocale}/${rest.join("/")}`
      : `/${targetLocale}/`;

    return next.replace(/\/{2,}/g, "/");
  };

  const navigate = (url: string) => {
    const loc = window.location as unknown as {
      assign?: (u: string) => void;
      href: string;
    };

    if (typeof loc.assign === "function") {
      loc.assign(url);
      return;
    }

    try {
      loc.href = url;
    } catch {
      // noop (evita quebrar em ambientes tipo JSDOM restritos)
    }
  };

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    // Removido check de window aqui pois onClick só roda no cliente

    const normalizedCurrent = normalizePathname(currentPath);
    const routeKey = getRouteKeyFromPath(normalizedCurrent);

    let newPath = routeKey
      ? getLocalizedRoute(routeKey, newLocale)
      : buildPrefixSwapPath(normalizedCurrent, newLocale);

    // Hardcode para home para garantir raiz limpa
    if (routeKey === "home") {
      newPath = newLocale === "pt" ? "/" : `/${newLocale}/`;
    }

    // Garante limpeza do prefixo padrão se a rota gerada o contiver
    if (newLocale === "pt") {
      newPath = stripDefaultLocalePrefix(newPath, "pt");
    }

    newPath = newPath.replace(/\/{2,}/g, "/");

    const query = window.location?.search ?? "";
    const hash = window.location?.hash ?? "";

    navigate(`${newPath}${query}${hash}`);
  };

  const nextLocale: Locale = currentLocale === "pt" ? "en" : "pt";

  const localeConfig = {
    pt: { flag: "🇧🇷", label: "PT", ariaLabel: "Português" },
    en: { flag: "🇺🇸", label: "EN", ariaLabel: "English" },
  } as const;

  const currentConfig = localeConfig[currentLocale];
  const nextConfig = localeConfig[nextLocale];

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => handleLocaleChange(nextLocale)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleLocaleChange(nextLocale);
        }
      }}
      className={`gap-2 ${className}`}
      aria-label={`Mudar idioma para ${nextConfig.ariaLabel}`}
      title={`Alternar para ${nextConfig.ariaLabel}`}
    >
      <span aria-hidden="true">{currentConfig.flag}</span>
      <span>{currentConfig.label}</span>
    </Button>
  );
};
