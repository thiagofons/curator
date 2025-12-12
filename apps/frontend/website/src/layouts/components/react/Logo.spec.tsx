/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders light logo by default", () => {
    render(<Logo />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/logo-light.svg");
    expect(img).toHaveAttribute("alt", "Curator");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveClass("h-8", "w-auto");
  });

  it("renders light logo when type is explicitly set to light", () => {
    render(<Logo type="light" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveAttribute("src", "/images/logo-light.svg");
  });

  it("renders dark logo when type is dark", () => {
    render(<Logo type="dark" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveAttribute("src", "/images/logo-dark.svg");
    expect(img).toHaveAttribute("alt", "Curator");
  });

  it("applies custom className to container", () => {
    const { container } = render(<Logo className="custom-class" />);
    const logoContainer = container.firstChild;

    expect(logoContainer).toHaveClass("custom-class");
    // Verify base classes are still present
    expect(logoContainer).toHaveClass("flex", "items-center", "gap-2");
  });

  it("maintains consistent structure with both logo types", () => {
    const { rerender, container } = render(<Logo type="light" />);
    const lightContainer = container.firstChild;

    rerender(<Logo type="dark" />);
    const darkContainer = container.firstChild;

    // Both should have the same container classes
    expect(lightContainer).toHaveClass("flex", "items-center", "gap-2");
    expect(darkContainer).toHaveClass("flex", "items-center", "gap-2");
  });
});
