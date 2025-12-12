import menuData from "@/config/menu.json";
import { Button } from "@repo/ui-web/base/button";
import { Typography } from "@repo/ui-web/custom/typography";
import { cn } from "@repo/ui-web/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu, IoSearch } from "react-icons/io5";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pegando a estrutura 'main' do seu JSON
  const navLinks = menuData.main;

  // Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn("bg-white fixed top-0 left-0 right-0 z-50 py-6")}
      >
        <div className="w-full max-w-[1300px] container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* LOGO */}
          <a href="/" aria-label="Home">
            <Logo />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <a key={item.name} href={item.url}>
                <Typography className="text-foreground hover:text-primary transition-colors">
                  {item.name}
                </Typography>
              </a>
            ))}
          </nav>

          {/* ACTIONS (Search + CTA + Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <a
              href="/blog/search"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Pesquisar"
            >
              <IoSearch size={20} />
            </a>
            {/* CTA Button (Desktop Only) */}
            <div className="hidden md:block">
              <Button>Começar Jornada</Button>
            </div>
            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
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
            className="fixed inset-0 z-40 bg-white md:hidden flex flex-col items-center justify-center space-y-8 pt-20"
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Typography className="text-foreground hover:text-primary transition-colors">
                  {item.name}
                </Typography>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button>Começar</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
