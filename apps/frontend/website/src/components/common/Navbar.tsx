import menu from "@/config/menu.json"; // Importando o JSON
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { Button } from "@repo/ui-web/base/button";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Logo } from "./Logo"; // Certifique-se de ter criado o Logo.tsx

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const [lang, setLang] = useState("pt");

  const t = useTranslations(lang as any);
  const navLinks = menu.main;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname;
    setCurrentPath(pathname);

    const currentUrl = new URL(window.location.href);
    const detectedLang = getLangFromUrl(currentUrl);
    setLang(detectedLang);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getMenuLink = (path: string) => {
    if (path.startsWith("http")) return path;

    if (lang === "pt") return path;

    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (cleanPath === "/" && lang) return `/${lang}`;

    return `/${lang}${cleanPath}`;
  };

  // Classes dinâmicas para a Pílula
  const pillClasses = `
    relative flex w-full max-w-[1000px] items-center justify-between
    rounded-full border border-white/20
    px-6 py-3 shadow-lg backdrop-blur-md
    transition-all duration-500 ease-in-out
    md:px-8 md:py-4
    ${
      isOpen
        ? "bg-transparent border-transparent shadow-none"
        : "bg-white/80 hover:bg-white/95 hover:shadow-xl"
    }
    ${isScrolled && !isOpen ? "py-2 md:py-3 max-w-[900px] bg-white/95" : ""}
  `;

  return (
    <>
      {/* WRAPPER FIXO */}
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 py-4">
        {/* PÍLULA FLUTUANTE */}
        <div className={`${pillClasses} pointer-events-auto`}>
          {/* LOGO */}
          <a href={getMenuLink("/")} className="relative z-10 flex-shrink-0">
            <Logo />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => {
              const linkUrl = getMenuLink(item.url);
              const isActive =
                currentPath === linkUrl ||
                (linkUrl !== "/" && currentPath.startsWith(linkUrl));

              return (
                <a
                  key={item.url}
                  href={linkUrl}
                  className={`hover:text-primary text-sm font-medium transition-colors ${
                    isActive ? "text-primary font-bold" : "text-black"
                  }`}
                >
                  {t(item.name as any)}
                </a>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button className="h-10 rounded-full px-6">
                {t("nav.start_journey" as any) || "Começar"}
              </Button>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground relative z-50 p-1 md:hidden"
              aria-label="Alternar menu"
            >
              {isOpen ? (
                <X className="animate-in fade-in zoom-in h-6 w-6 text-gray-700 duration-300" />
              ) : (
                <Menu className="animate-in fade-in zoom-in h-6 w-6 text-gray-700 duration-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-white/95 backdrop-blur-xl md:hidden"
        style={{
          clipPath: isOpen
            ? "circle(150% at 100% 0%)"
            : "circle(0% at 100% 0%)",
          transition: "clip-path 0.6s cubic-bezier(0.7, 0, 0.3, 1)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {navLinks.map((item, index) => (
          <a
            key={item.url}
            href={getMenuLink(item.url)}
            onClick={() => setIsOpen(false)}
            className="text-foreground hover:text-primary text-3xl font-bold transition-all duration-500 ease-out"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(1rem)",
              transitionDelay: isOpen ? `${0.1 + index * 0.1}s` : "0s",
            }}
          >
            {t(item.name as any)}
          </a>
        ))}

        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(1rem)",
            transitionDelay: isOpen ? "0.6s" : "0s",
          }}
        >
          <Button className="w-full rounded-full px-10 py-6 text-lg">
            {t("nav.start_journey" as any) || "Começar"}
          </Button>
        </div>
      </div>
    </>
  );
}
