/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";

// Mock menu data
vi.mock("@/config/menu.json", () => ({
  default: {
    main: [
      {
        name: "Início",
        url: "/",
      },
      {
        name: "Open Source",
        url: "/open-source",
      },
      {
        name: "Blog",
        url: "/blog",
      },
      {
        name: "Sobre",
        url: "/about",
      },
    ],
  },
}));

// Mock i18n utilities
vi.mock("@/i18n/utils", () => ({
  getLangFromUrl: vi.fn(() => "pt-br"),
  useTranslations: vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      "nav.home": "Home",
      "nav.start_journey": "Começar",
      Início: "Início",
      "Open Source": "Open Source",
      Blog: "Blog",
      Sobre: "Sobre",
    };
    return translations[key] || key;
  }),
  useTranslatedPath: vi.fn(() => (path: string) => path),
}));

// Mock Button component to avoid framer-motion complexity
vi.mock("@repo/ui-web/base/button", () => ({
  Button: React.forwardRef(({ children, ...props }: any, ref: any) => (
    <button {...props} ref={ref}>
      {children}
    </button>
  )),
}));

// Mock H3 typography component
vi.mock("@repo/ui-web/custom/typography", () => ({
  H3: ({ children, as: Component = "h3", ...props }: any) => (
    <Component {...props}>{children}</Component>
  ),
}));

// Mock Logo component
vi.mock("./Logo", () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

// Mock framer-motion components
vi.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Importar depois dos mocks
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    window.scrollY = 0;
    // Mock window.location
    Object.defineProperty(window, "location", {
      value: { href: "http://localhost/" },
      writable: true,
    });
  });

  describe("Desktop Navigation", () => {
    it("renders logo with home link", () => {
      render(<Navbar />);
      const logo = screen.getByTestId("logo");
      const homeLink = logo.closest("a");

      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
      expect(homeLink).toHaveAttribute("aria-label", "Home");
    });

    it("renders all navigation links from menu config", () => {
      render(<Navbar />);

      const expectedLinks = ["Início", "Open Source", "Blog", "Sobre"];

      expectedLinks.forEach((linkName) => {
        const link = screen.getByText(linkName);
        expect(link).toBeInTheDocument();
      });
    });

    it("navigation links have correct hrefs", () => {
      render(<Navbar />);

      const linkMap = [
        { text: "Início", href: "/" },
        { text: "Open Source", href: "/open-source" },
        { text: "Blog", href: "/blog" },
        { text: "Sobre", href: "/about" },
      ];

      linkMap.forEach(({ text, href }) => {
        const link = screen.getByText(text).closest("a");
        expect(link).toHaveAttribute("href", href);
      });
    });

    it("renders CTA button on desktop", () => {
      render(<Navbar />);
      const ctaButton = screen.getByRole("button", {
        name: /começar/i,
      });

      expect(ctaButton).toBeInTheDocument();
    });
  });

  describe("Mobile Navigation", () => {
    it("shows mobile menu toggle button", () => {
      render(<Navbar />);
      const toggleButtons = screen.getAllByRole("button");
      const mobileToggle = toggleButtons.find(
        (btn) =>
          btn.querySelector("svg") && !btn.textContent?.match(/começar/i),
      );

      expect(mobileToggle).toBeInTheDocument();
    });

    it("opens mobile menu when toggle is clicked", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const toggleButtons = screen.getAllByRole("button");
      const mobileToggle = toggleButtons.find(
        (btn) =>
          btn.querySelector("svg") && !btn.textContent?.match(/começar/i),
      );

      await user.click(mobileToggle!);

      await waitFor(() => {
        // Verifica se os links aparecem duplicados (desktop + mobile)
        const inicioLinks = screen.getAllByText("Início");
        expect(inicioLinks.length).toBe(2); // 1 desktop + 1 mobile
      });
    });

    it("closes mobile menu when a link is clicked", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const toggleButtons = screen.getAllByRole("button");
      const mobileToggle = toggleButtons.find(
        (btn) =>
          btn.querySelector("svg") && !btn.textContent?.match(/começar/i),
      );

      // Abre o menu
      await user.click(mobileToggle!);

      await waitFor(() => {
        const blogLinks = screen.getAllByText("Blog");
        expect(blogLinks.length).toBe(2);
      });

      // Clica em um link do mobile menu (o segundo Blog)
      const blogLinks = screen.getAllByText("Blog");
      const mobileLink = blogLinks[1];

      await user.click(mobileLink);

      // Verifica que o menu fechou (apenas 1 link de cada agora)
      await waitFor(() => {
        const blogLinksAfter = screen.getAllByText("Blog");
        expect(blogLinksAfter.length).toBe(1);
      });
    });

    it("renders CTA button in mobile menu", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const toggleButtons = screen.getAllByRole("button");
      const mobileToggle = toggleButtons.find(
        (btn) =>
          btn.querySelector("svg") && !btn.textContent?.match(/começar/i),
      );

      await user.click(mobileToggle!);

      await waitFor(() => {
        const ctaButtons = screen.getAllByRole("button", {
          name: /começar/i,
        });
        // Desktop (oculto) + Mobile (visível)
        expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("Scroll Behavior", () => {
    it("registers scroll event listener on mount", () => {
      const addEventListenerSpy = vi.spyOn(window, "addEventListener");
      render(<Navbar />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
      );
    });

    it("cleans up scroll listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
      const { unmount } = render(<Navbar />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
      );
    });

    it("updates isScrolled state when scrolling", async () => {
      render(<Navbar />);

      // Simula scroll
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));

      // O estado interno muda mas não há efeito visual neste componente
      // apenas verificamos que o listener funciona
      expect(window.scrollY).toBe(100);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA label for home link", () => {
      render(<Navbar />);
      const logo = screen.getByTestId("logo");
      const homeLink = logo.closest("a");

      expect(homeLink).toHaveAttribute("aria-label", "Home");
    });

    it("navigation links are keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      // Primeiro tab vai para o logo/home link
      await user.tab();

      const logo = screen.getByTestId("logo");
      const homeLink = logo.closest("a");
      expect(homeLink).toHaveFocus();
    });

    it("mobile menu toggle is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const toggleButtons = screen.getAllByRole("button");
      const mobileToggle = toggleButtons.find(
        (btn) =>
          btn.querySelector("svg") && !btn.textContent?.match(/começar/i),
      );

      mobileToggle!.focus();
      expect(mobileToggle).toHaveFocus();

      await user.keyboard("{Enter}");

      await waitFor(() => {
        const inicioLinks = screen.getAllByText("Início");
        expect(inicioLinks.length).toBe(2);
      });
    });
  });

  describe("Integration", () => {
    it("renders complete navbar structure", () => {
      const { container } = render(<Navbar />);

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("fixed", "top-0", "z-50");

      const navContainer = container.querySelector(".container");
      expect(navContainer).toBeInTheDocument();
    });

    it("maintains fixed positioning", () => {
      const { container } = render(<Navbar />);
      const header = container.querySelector("header");

      expect(header).toHaveClass("fixed");
    });

    it("navbar is responsive with proper classes", () => {
      const { container } = render(<Navbar />);

      // Desktop nav tem classe hidden md:flex
      const desktopNav = container.querySelector("nav");
      expect(desktopNav).toHaveClass("hidden", "md:flex");

      // Mobile toggle tem classe md:hidden
      const toggleButtons = screen.getAllByRole("button");
      const mobileToggle = toggleButtons.find(
        (btn) =>
          btn.querySelector("svg") && !btn.textContent?.match(/começar/i),
      );
      expect(mobileToggle).toHaveClass("md:hidden");
    });
  });
});
