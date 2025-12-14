import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    // Mock window.location
    delete (window as any).location;
    window.location = { href: "" } as any;
  });

  it("should render all available locales", () => {
    render(<LanguageSwitcher initialPath="/" />);

    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("should highlight current locale (Portuguese)", () => {
    render(<LanguageSwitcher initialPath="/sobre" />);

    const ptButton = screen.getByText("PT");
    const enButton = screen.getByText("EN");

    expect(ptButton).toHaveClass("bg-primary");
    expect(enButton).not.toHaveClass("bg-primary");
  });

  it("should highlight current locale (English)", () => {
    render(<LanguageSwitcher initialPath="/en/about" />);

    const ptButton = screen.getByText("PT");
    const enButton = screen.getByText("EN");

    expect(ptButton).not.toHaveClass("bg-primary");
    expect(enButton).toHaveClass("bg-primary");
  });

  it("should navigate to correct localized route when switching from PT to EN", () => {
    render(<LanguageSwitcher initialPath="/sobre" />);

    const enButton = screen.getByText("EN");
    fireEvent.click(enButton);

    expect(window.location.href).toBe("/en/about");
  });

  it("should navigate to correct localized route when switching from EN to PT", () => {
    render(<LanguageSwitcher initialPath="/en/about" />);

    const ptButton = screen.getByText("PT");
    fireEvent.click(ptButton);

    expect(window.location.href).toBe("/sobre");
  });

  it("should handle roadmaps route correctly", () => {
    render(<LanguageSwitcher initialPath="/trilhas" />);

    const enButton = screen.getByText("EN");
    fireEvent.click(enButton);

    expect(window.location.href).toBe("/en/roadmaps");
  });

  it("should not navigate when clicking current locale", () => {
    render(<LanguageSwitcher initialPath="/sobre" />);

    const ptButton = screen.getByText("PT");
    const initialHref = window.location.href;

    fireEvent.click(ptButton);

    expect(window.location.href).toBe(initialHref);
  });

  it("should have proper ARIA labels", () => {
    render(<LanguageSwitcher initialPath="/sobre" />);

    const ptButton = screen.getByLabelText(/Mudar idioma para Português/i);
    const enButton = screen.getByLabelText(/Mudar idioma para English/i);

    expect(ptButton).toBeInTheDocument();
    expect(enButton).toBeInTheDocument();
  });

  it("should mark active locale with aria-current", () => {
    render(<LanguageSwitcher initialPath="/sobre" />);

    const ptButton = screen.getByText("PT");

    expect(ptButton).toHaveAttribute("aria-current", "true");
  });
});
