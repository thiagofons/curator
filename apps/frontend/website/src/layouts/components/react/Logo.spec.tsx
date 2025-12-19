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
    expect(img).toHaveAttribute("src", "/images/logo-light.png");
    expect(img).toHaveAttribute("alt", "Curator");
    expect(img).toHaveAttribute("loading", "lazy");
    // Default size is "md" which maps to "h-8"
    expect(img).toHaveClass("h-8", "w-auto");
  });

  it("renders light logo when type is explicitly set to light", () => {
    render(<Logo type="light" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveAttribute("src", "/images/logo-light.png");
  });

  it("renders dark logo when type is dark", () => {
    render(<Logo type="dark" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveAttribute("src", "/images/logo-dark.png");
    expect(img).toHaveAttribute("alt", "Curator");
  });

  it("applies custom className to container", () => {
    const { container } = render(<Logo className="custom-class" />);
    const logoContainer = container.firstChild;

    expect(logoContainer).toHaveClass("custom-class");
    expect(logoContainer).toHaveClass("flex", "items-center", "gap-2");
  });

  // --- SIZE VARIANT TESTS ---

  it("renders with xs size", () => {
    render(<Logo size="xs" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveClass("h-4", "w-auto");
  });

  it("renders with sm size", () => {
    render(<Logo size="sm" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveClass("h-6", "w-auto");
  });

  it("renders with md size (default)", () => {
    render(<Logo size="md" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveClass("h-8", "w-auto");
  });

  it("renders with lg size", () => {
    render(<Logo size="lg" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveClass("h-10", "w-auto");
  });

  it("renders with xl size", () => {
    render(<Logo size="xl" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveClass("h-12", "w-auto");
  });

  it("renders with 2xl size", () => {
    render(<Logo size="2xl" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveClass("h-16", "w-auto");
  });

  it("combines size and type props correctly", () => {
    render(<Logo type="dark" size="xl" />);
    const img = screen.getByRole("img", { name: "Curator" });

    expect(img).toHaveAttribute("src", "/images/logo-dark.png");
    expect(img).toHaveClass("h-12", "w-auto");
  });

  it("maintains consistent structure with both logo types", () => {
    const { rerender, container } = render(<Logo type="light" />);
    const lightContainer = container.firstChild;

    rerender(<Logo type="dark" />);
    const darkContainer = container.firstChild;

    expect(lightContainer).toHaveClass("flex", "items-center", "gap-2");
    expect(darkContainer).toHaveClass("flex", "items-center", "gap-2");
  });
});
