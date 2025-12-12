import { type Locale } from "@/i18n/localized-routes";
import { getLocaleFromPath, switchLocale } from "@/i18n/routing";
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
  const [currentPath, setCurrentPath] = useState(initialPath || "/");
  const currentLocale = getLocaleFromPath(currentPath);

  // Sincroniza com mudanças de rota no cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);

      // Listener para SPAs que usam History API
      const handleLocationChange = () => {
        setCurrentPath(window.location.pathname);
      };

      window.addEventListener("popstate", handleLocationChange);

      return () => {
        window.removeEventListener("popstate", handleLocationChange);
      };
    }
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    const newPath = switchLocale(currentPath, newLocale);

    // Preserva query params e hash
    const query = window.location.search ?? "";
    const hash = window.location.hash ?? "";

    // Navega para a nova rota localizada
    window.location.href = `${newPath}${query}${hash}`;
  };

  // Determina o próximo locale (toggle entre os disponíveis)
  const nextLocale: Locale = currentLocale === "pt" ? "en" : "pt";

  // Bandeiras e labels por locale
  const localeConfig = {
    pt: { flag: "🇧🇷", label: "PT", ariaLabel: "Português" },
    en: { flag: "🇺🇸", label: "EN", ariaLabel: "English" },
  };

  const currentConfig = localeConfig[currentLocale];
  const nextConfig = localeConfig[nextLocale];
  const targetPath = switchLocale(currentPath, nextLocale);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleLocaleChange(nextLocale)}
      className={`gap-2 ${className}`}
      aria-label={`Mudar idioma para ${nextConfig.ariaLabel}`}
      title={`Alternar para ${nextConfig.ariaLabel}`}
    >
      <span aria-hidden="true">{currentConfig.flag}</span>
      <span>{currentConfig.label}</span>
    </Button>
  );
};
