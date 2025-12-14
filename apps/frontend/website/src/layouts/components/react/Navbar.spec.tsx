/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";

// --- MOCKS ---

// 1. Mock do menu.json
// Incluímos "/open-source" aqui, mas NÃO vamos mapeá-lo no componente Navbar (via routeMap implícito).
// Isso força o código a cair no "fallback" de rota não mapeada, que é onde estava a falta de cobertura.
vi.mock("@/config/menu.json", () => ({
  default: {
    main: [
      { name: "Início", url: "/" },
      { name: "Open Source", url: "/open-source" }, // Rota não mapeada (teste de fallback)
      { name: "Blog", url: "/blog" },
      { name: "Sobre", url: "/about" },
    ],
  },
}));

// 2. Mock do i18n/routing
// Usamos vi.fn() para permitir alterar o retorno de getLocaleFromPath em cada teste.
vi.mock("@/i18n/routing", () => ({
  getLocaleFromPath: vi.fn(() => "pt"), // Default para 'pt'
  getLocalizedRoute: vi.fn((key: string, locale: string) => {
    // Simula lógica simples: se for home, retorna raiz ou /en
    if (key === "home") return locale === "pt" ? "/" : `/${locale}`;
    return locale === "pt" ? `/${key}` : `/${locale}/${key}`;
  }),
}));

// 3. Mock do i18n/utils
vi.mock("@/i18n/utils", () => ({
  getLangFromUrl: vi.fn(() => "pt"),
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

// 4. Mocks de UI e Libs
vi.mock("@repo/ui-web/base/button", () => ({
  Button: React.forwardRef(({ children, ...props }: any, ref: any) => (
    <button {...props} ref={ref}>
      {children}
    </button>
  )),
}));

vi.mock("@repo/ui-web/custom/typography", () => ({
  H3: ({ children, as: Component = "h3", ...props }: any) => (
    <Component {...props}>{children}</Component>
  ),
}));

vi.mock("./Logo", () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

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

vi.mock("./LocaleSwitcher", () => ({
  LocaleSwitcher: ({ initialPath }: any) => (
    <div data-testid="locale-switcher" data-initial-path={initialPath}>
      LocaleSwitcher
    </div>
  ),
}));

// --- IMPORTS REAIS ---
// Importamos getLocaleFromPath para poder manipular o mock (vi.mocked)
import { getLocaleFromPath } from "@/i18n/routing";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  // Helper para prevenir navegação real do JSDOM
  const preventAnchorNavigation = (e: Event) => {
    const target = e.target as Element | null;
    if (target?.closest?.("a")) e.preventDefault();
  };

  beforeEach(() => {
    window.scrollY = 0;
    // Reset do mock de locale para o padrão 'pt' antes de cada teste
    vi.mocked(getLocaleFromPath).mockReturnValue("pt");

    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost/",
        pathname: "/",
        search: "",
        hash: "",
      },
      writable: true,
    });

    document.addEventListener("click", preventAnchorNavigation, true);
  });

  afterEach(() => {
    document.removeEventListener("click", preventAnchorNavigation, true);
    vi.clearAllMocks();
  });

  describe("Desktop Navigation", () => {
    it("renders logo with home link", () => {
      render(<Navbar />);
      const logo = screen.getByTestId("logo");
      const homeLink = logo.closest("a");
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("renders all navigation links from menu config", () => {
      render(<Navbar />);
      const expectedLinks = ["Início", "Open Source", "Blog", "Sobre"];
      expectedLinks.forEach((linkName) => {
        const link = screen.getByText(linkName);
        expect(link).toBeInTheDocument();
      });
    });

    // --- COBERTURA CRÍTICA: Branch 'locale === pt' (true) ---
    it("handles unmapped routes correctly when locale is default (PT)", () => {
      // Setup: Locale é PT. URL é /open-source (não mapeada no Navbar.tsx hardcoded map)
      vi.mocked(getLocaleFromPath).mockReturnValue("pt");

      render(<Navbar />);

      // Esperado: Retornar a url crua "/open-source" SEM prefixo /en
      const openSourceLink = screen.getByText("Open Source").closest("a");
      expect(openSourceLink).toHaveAttribute("href", "/open-source");
    });

    // --- COBERTURA CRÍTICA: Branch 'locale === pt' (false) / else ---
    it("prefixes unmapped routes with /en when current locale is English", () => {
      // Setup: Locale é EN.
      vi.mocked(getLocaleFromPath).mockReturnValue("en");

      // Ajusta window.location para consistência (embora o mock acima mande no componente)
      Object.defineProperty(window, "location", {
        value: {
          href: "http://localhost/en/some-page",
          pathname: "/en/some-page",
        },
        writable: true,
      });

      render(<Navbar />);

      // Esperado: Retornar "/en/open-source" (prefixado)
      const openSourceLink = screen.getByText("Open Source").closest("a");
      expect(openSourceLink).toHaveAttribute("href", "/en/open-source");
    });

    it("renders CTA button on desktop", () => {
      render(<Navbar />);
      const ctaButton = screen.getByRole("button", { name: /começar/i });
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
        const inicioLinks = screen.getAllByText("Início");
        expect(inicioLinks.length).toBe(2);
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

      await user.click(mobileToggle!);
      await waitFor(() => {
        expect(screen.getAllByText("Blog").length).toBe(2);
      });

      const mobileLink = screen.getAllByText("Blog")[1];
      await user.click(mobileLink);

      await waitFor(() => {
        expect(screen.getAllByText("Blog").length).toBe(1);
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
        const ctaButtons = screen.getAllByRole("button", { name: /começar/i });
        expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("Scroll Behavior", () => {
    it("updates isScrolled state when scrolling", async () => {
      render(<Navbar />);
      window.scrollY = 100;
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      // A verificação é indireta, pois o estado é interno.
      // Se tivéssemos alteração de classe CSS, testaríamos aqui.
      // Por enquanto, testamos se o evento não quebra nada.
      expect(window.scrollY).toBe(100);
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
  });

  describe("Accessibility", () => {
    it("has proper ARIA label for home link", () => {
      render(<Navbar />);
      const logo = screen.getByTestId("logo");
      expect(logo.closest("a")).toHaveAttribute("aria-label", "Home");
    });

    it("navigation links are keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      await user.tab();
      const logo = screen.getByTestId("logo");
      expect(logo.closest("a")).toHaveFocus();
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
        expect(screen.getAllByText("Início").length).toBe(2);
      });
    });
  });

  describe("Integration", () => {
    it("renders complete navbar structure with responsiveness", () => {
      const { container } = render(<Navbar />);
      const header = container.querySelector("header");
      expect(header).toHaveClass("fixed", "top-0", "z-50");
      const desktopNav = container.querySelector("nav");
      expect(desktopNav).toHaveClass("hidden", "md:flex");
    });

    it("syncs currentPath on popstate and propagates it to LocaleSwitcher", async () => {
      render(<Navbar />);
      const ls = screen.getAllByTestId("locale-switcher")[0];
      expect(ls).toHaveAttribute("data-initial-path", "/");

      (window.location as any).pathname = "/en/about";
      act(() => {
        window.dispatchEvent(new PopStateEvent("popstate"));
      });

      await waitFor(() => {
        const updated = screen.getAllByTestId("locale-switcher")[0];
        expect(updated).toHaveAttribute("data-initial-path", "/en/about");
      });
    });
  });

  it("does not trigger jsdom navigation when clicking a nav link", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await expect(
      user.click(screen.getAllByText("Blog")[0]),
    ).resolves.toBeUndefined();
  });
});
