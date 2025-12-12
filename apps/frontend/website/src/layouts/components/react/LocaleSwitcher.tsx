import { getLangFromUrl, useTranslatedPath } from "@/i18n/utils";
import { Button } from "@repo/ui-web/base/button";
import * as React from "react";

const supportedLocales = ["pt", "en"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

const getCurrentLocale = (): SupportedLocale => {
  const lang = getLangFromUrl(new URL(window.location.href));
  return supportedLocales.includes(lang as SupportedLocale)
    ? (lang as SupportedLocale)
    : "pt";
};

const stripLocalePrefix = (pathname: string) =>
  pathname.replace(/^\/(pt|en)(\/|$)/, "/");

export const LocaleSwitcher: React.FC = () => {
  const [currentLocale, setCurrentLocale] =
    React.useState<SupportedLocale | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentLocale(getCurrentLocale());
  }, []);

  const nextLocale: SupportedLocale = currentLocale === "en" ? "pt" : "en";
  const translatePath = useTranslatedPath(nextLocale);

  const handleSwitch = () => {
    if (!currentLocale) return;
    const basePath = stripLocalePrefix(window.location.pathname) || "/";
    const nextPath = translatePath(basePath);
    const query = window.location.search ?? "";
    const hash = window.location.hash ?? "";
    window.location.assign(`${nextPath}${query}${hash}`);
  };

  if (!currentLocale) return null;

  // Bandeiras por locale (emoji)
  const localeFlag = currentLocale === "pt" ? "🇧🇷" : "🇺🇸";
  const localeLabel = currentLocale.toUpperCase();

  return (
    <Button variant="ghost" size="sm" onClick={handleSwitch} className="gap-2">
      <span aria-hidden="true">{localeFlag}</span>
      <span>{localeLabel}</span>
    </Button>
  );
};
