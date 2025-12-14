import type { Locale } from "@/i18n/localized-routes";
import { LOCALES } from "@/i18n/localized-routes";
import { getLocaleFromPath, switchLocale } from "@/i18n/routing";
import * as React from "react";
import { useEffect, useState } from "react";

interface LanguageSwitcherProps {
  /**
   * O pathname atual (window.location.pathname no cliente)
   * Pode ser passado via Astro.url.pathname no servidor
   */
  initialPath?: string;
  className?: string;
}

export function LanguageSwitcher({
  initialPath,
  className = "",
}: LanguageSwitcherProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (initialPath) return initialPath;
    if (typeof window === "undefined") return "/";
    return window.location?.pathname || "/";
  });

  const currentLocale = getLocaleFromPath(currentPath);

  // Sincroniza com mudanças de rota no cliente
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLocationChange = () => {
      const next = window.location?.pathname;
      if (typeof next === "string" && next.length > 0) setCurrentPath(next);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    if (typeof window === "undefined") return;

    const newPath = switchLocale(currentPath, newLocale);
    window.location.href = newPath;
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        const targetPath = switchLocale(currentPath, locale);

        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleLocaleChange(locale)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleLocaleChange(locale);
              }
            }}
            className={`rounded-md px-3 py-1 font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            } `}
            aria-label={`Mudar idioma para ${locale === "pt" ? "Português" : "English"}`}
            aria-current={isActive ? "true" : undefined}
            title={targetPath}
          >
            {locale === "pt" ? "PT" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
