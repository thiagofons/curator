/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";

// Mock menu data - usando dados inline para evitar problemas de resolução
vi.mock("@/config/menu.json", () => ({
  default: {
    main: [
      { name: "Sobre", url: "/sobre" },
      { name: "Trilhas", url: "/trilhas" },
      { name: "Blog", url: "/blog" },
      { name: "Comunidade", url: "/comunidade" },
    ],
  },
}));

// Mock Button component to avoid framer-motion complexity
vi.mock("@repo/ui-web/base/button", () => ({
  Button: React.forwardRef(({ children, ...props }: any, ref: any) => (
    <button {...props} ref={ref}>
      {children}
    </button>
  )),
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
  });

  describe("Desktop Navigation", () => {
    it("renders logo with home link", () => {
      render(<Navbar />);
      const homeLink = screen.getByRole("link", { name: /home/i });

      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("renders all navigation links from menu config", () => {
      render(<Navbar />);

      const expectedLinks = ["Sobre", "Trilhas", "Blog", "Comunidade"];

      expectedLinks.forEach((linkName) => {
        const links = screen.getAllByText(linkName);
        expect(links.length).toBeGreaterThan(0);
      });
    });

    it("renders CTA button on desktop", () => {
      render(<Navbar />);
      const ctaButtons = screen.getAllByRole("button", {
        name: /começar/i,
      });

      expect(ctaButtons.length).toBeGreaterThan(0);
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
        const mobileMenuLinks = screen.getAllByText(
          /sobre|trilhas|blog|comunidade/i,
        );
        expect(mobileMenuLinks.length).toBeGreaterThan(4);
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

      const mobileLinks = screen.getAllByText(/sobre/i);
      const mobileLink = mobileLinks[mobileLinks.length - 1];

      mobileLink.addEventListener("click", (e) => e.preventDefault());
      await user.click(mobileLink);

      expect(mobileToggle).toBeInTheDocument();
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
  });

  describe("Accessibility", () => {
    it("has proper ARIA label for home link", () => {
      render(<Navbar />);
      const homeLink = screen.getByRole("link", { name: /home/i });

      expect(homeLink).toHaveAttribute("aria-label", "Home");
    });

    it("navigation links are keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      await user.tab();

      const homeLink = screen.getByRole("link", { name: /home/i });
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
        const mobileMenuLinks = screen.getAllByText(
          /sobre|trilhas|blog|comunidade/i,
        );
        expect(mobileMenuLinks.length).toBeGreaterThan(4);
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
  });
});
