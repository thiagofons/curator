import menuData from "@/config/menu.json";
import {
  getLangFromUrl,
  useTranslatedPath,
  useTranslations,
} from "@/i18n/utils";
import { Button } from "@repo/ui-web/base/button";
import { H3 } from "@repo/ui-web/custom/typography";
import { cn } from "@repo/ui-web/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pegando a estrutura 'main' do seu JSON
  const navLinks = menuData.main;

  const lang = getLangFromUrl(new URL(window.location.href));
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);

  // Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn("fixed top-0 right-0 left-0 z-50 bg-white py-6")}
      >
        <div className="container mx-auto flex w-full max-w-[1300px] items-center justify-between px-4 md:px-6">
          {/* LOGO */}
          <a href={translatePath("/")} aria-label={t("nav.home")}>
            <Logo />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <a key={item.name} href={translatePath(item.url)}>
                <H3
                  as="span"
                  variant="heading-h3"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t(item.name as keyof typeof t)}
                </H3>
              </a>
            ))}
          </nav>

          {/* ACTIONS (Language + CTA + Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            {/* <LanguageSwitcher /> */}

            {/* CTA Button (Desktop Only) */}
            <div className="hidden md:block">
              <Button>{t("nav.start_journey")}</Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="text-foreground p-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU FULLSCREEN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-white pt-20 md:hidden"
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item.name}
                href={translatePath(item.url)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <H3
                  as="span"
                  variant="heading-h3"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t(item.name as keyof typeof t)}
                </H3>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* <LanguageSwitcher showLabel variant="outline" /> */}
              <Button>Começar</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
