import { Button } from "@repo/ui-web/base/button";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface MenuItem {
  label: string;
  url: string;
}

interface NavbarProps {
  items: MenuItem[];
  cta: {
    enabled: boolean;
    label: string;
  };
}

export default function Navbar({ items, cta }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 py-4">
        <div className={`${pillClasses} pointer-events-auto`}>
          <a href="/" className="relative z-10 flex-shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {items.map((item) => {
              const isActive =
                currentPath === item.url ||
                (item.url !== "/" && currentPath.startsWith(item.url));

              return (
                <a
                  key={item.url}
                  href={item.url}
                  className={`hover:text-primary text-sm font-medium transition-colors ${
                    isActive ? "text-primary font-bold" : "text-black"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              {cta.enabled && (
                <Button className="h-10 rounded-full px-6">{cta.label}</Button>
              )}
            </div>

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

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-between bg-white/95 p-8 backdrop-blur-xl md:hidden"
        style={{
          clipPath: isOpen
            ? "circle(150% at 100% 0%)"
            : "circle(0% at 100% 0%)",
          transition: "clip-path 0.6s cubic-bezier(0.7, 0, 0.3, 1)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div />
        <div className="flex flex-col items-center justify-center space-y-8">
          {items.map((item, index) => (
            <a
              key={item.url}
              href={item.url}
              onClick={() => setIsOpen(false)}
              className="text-foreground hover:text-primary text-3xl font-bold transition-all duration-500 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(1rem)",
                transitionDelay: isOpen ? `${0.1 + index * 0.1}s` : "0s",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(1rem)",
            transitionDelay: isOpen ? "0.6s" : "0s",
          }}
        >
          {cta.enabled && (
            <Button className="w-full rounded-full px-10 py-6 text-lg">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
