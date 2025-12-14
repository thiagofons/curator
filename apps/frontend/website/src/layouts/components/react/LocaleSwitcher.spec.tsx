/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { vi } from "vitest";

// --- MOCKS ---
vi.mock("@/i18n/routing", () => ({
  getLocaleFromPath: vi.fn((path: string) =>
    path.startsWith("/en") ? "en" : "pt",
  ),
  getRouteKeyFromPath: vi.fn((path: string) =>
    path.includes("roadmaps") ? "roadmaps" : null,
  ),
  getLocalizedRoute: vi.fn((key: string, locale: string) => {
    if (key === "home") return locale === "pt" ? "/" : "/en";
    return locale === "pt" ? `/${key}` : `/en/${key}`;
  }),
  LOCALES: ["pt", "en"],
}));

vi.mock("@/i18n/utils", () => ({
  getLangFromUrl: vi.fn(() => "pt"),
  useTranslatedPath: vi.fn(),
}));

vi.mock("@repo/ui-web/base/button", async () => {
  const { forwardRef } = await import("react");
  return {
    Button: forwardRef(({ children, ...props }: any, ref: any) => (
      <button {...props} ref={ref}>
        {children}
      </button>
    )),
  };
});

// Importações REAIS (após mocks)
import { getLocalizedRoute, getRouteKeyFromPath } from "@/i18n/routing"; // Importamos para poder usar o mock
import { LocaleSwitcher } from "./LocaleSwitcher";

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/pt/roadmaps",
        search: "",
        hash: "",
        assign: vi.fn(),
        href: "http://localhost/pt/roadmaps",
      },
      writable: true,
    });
    vi.clearAllMocks();
  });

  it("renders with the correct flag and shows current locale", () => {
    render(<LocaleSwitcher />);
    expect(screen.getByText("🇧🇷")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
  });

  it("switches to en when current locale is pt", async () => {
    const user = userEvent.setup();

    vi.mocked(getRouteKeyFromPath).mockReturnValue("roadmaps");
    vi.mocked(getLocalizedRoute).mockReturnValue("/en/roadmaps");

    render(<LocaleSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith("/en/roadmaps");
  });

  it("correctly strips default prefix when router returns exactly '/pt' (covers empty slice fallback)", async () => {
    const user = userEvent.setup();

    window.location.pathname = "/en/some-page";

    vi.mocked(getRouteKeyFromPath).mockReturnValue("some-page");

    vi.mocked(getLocalizedRoute).mockReturnValue("/pt");

    render(<LocaleSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith("/");
  });

  it("switches to pt when current locale is en", async () => {
    window.location.pathname = "/en";
    const user = userEvent.setup();
    render(<LocaleSwitcher />);

    vi.mocked(getRouteKeyFromPath).mockReturnValue("home");
    vi.mocked(getLocalizedRoute).mockReturnValue("/");

    await user.click(screen.getByRole("button"));
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });

  it("handles unmapped routes (fallback logic)", async () => {
    const user = userEvent.setup();
    window.location.pathname = "/pt/unknown";

    vi.mocked(getRouteKeyFromPath).mockReturnValue(null);

    render(<LocaleSwitcher />);
    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith("/en/unknown");
  });

  it("is keyboard accessible (Enter triggers click)", async () => {
    const user = userEvent.setup();
    render(<LocaleSwitcher />);
    const btn = screen.getByRole("button");

    btn.focus();
    await user.keyboard("{Enter}");
    expect(window.location.assign).toHaveBeenCalled();
  });

  it("updates when pathname changes via popstate", async () => {
    render(<LocaleSwitcher />);

    (window.location as any).pathname = "/en/roadmaps";
    act(() => window.dispatchEvent(new PopStateEvent("popstate")));

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("EN");
    });
  });

  it("falls back to href when assign is missing", async () => {
    const user = userEvent.setup();
    delete (window as any).location;
    window.location = {
      pathname: "/pt/foo",
      href: "",
      // sem assign
    } as any;

    render(<LocaleSwitcher />);
    await user.click(screen.getByRole("button"));
    expect(window.location.href).toContain("/en/foo");
  });

  it("handles empty initialPath prop gracefully", async () => {
    render(<LocaleSwitcher initialPath="" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
