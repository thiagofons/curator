import { LOCALES, type Locale } from "@/i18n/localized-routes";
import { getLocaleFromPath } from "@/i18n/routing";
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
    if (initialPath) return initialPath;
    if (typeof window === "undefined") return "/";
    return window.location?.pathname || "/";
  });

  const currentLocale = getLocaleFromPath(currentPath);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

  const buildSwitchedPath = (pathname: string, targetLocale: Locale) => {
    const normalized = normalizePathname(pathname);
    const segments = normalized.split("/").filter(Boolean);

    const rest =
      segments.length > 0 && LOCALES.includes(segments[0] as Locale)
        ? segments.slice(1)
        : segments;

    // Root deve ficar com trailing slash: "/en/" e "/pt/"
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

    // Evita quebrar em ambientes tipo JSDOM quando assign não está disponível/mockado.
    try {
      loc.href = url;
    } catch {
      // noop
    }
  };

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    if (typeof window === "undefined") return;

    const newPath = buildSwitchedPath(currentPath, newLocale);
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
