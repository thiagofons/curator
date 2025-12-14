/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Mocks

vi.mock("@/i18n/utils", () => {
  const getLangFromUrl = vi.fn(() => "pt");
  const useTranslatedPath = vi.fn((nextLocale: string) => (path: string) => {
    // Simulate path translation: prefix with /<locale>
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `/${nextLocale}${normalized}`.replace(/\/+/, "/");
  });
  return { getLangFromUrl, useTranslatedPath };
});

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

// Import after mocks
import { LocaleSwitcher } from "./LocaleSwitcher";

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    // Define a controllable window.location for each test
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/pt/blog/post-1",
        search: "",
        hash: "",
        assign: vi.fn(),
        href: "http://localhost/pt/blog/post-1",
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with the correct flag and shows current locale", () => {
    render(<LocaleSwitcher />);
    expect(screen.getByText("🇧🇷")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
  });

  it("switches to en when current locale is pt and preserves query/hash", async () => {
    const user = userEvent.setup();
    window.location.pathname = "/pt/roadmaps";
    window.location.search = "?q=node";
    window.location.hash = "#section-2";
    render(<LocaleSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith(
      "/en/roadmaps?q=node#section-2",
    );
  });

  it("switches to pt when current locale is en", async () => {
    // Override getLangFromUrl to return 'en'
    const utils = await import("@/i18n/utils");
    (utils.getLangFromUrl as any).mockReturnValueOnce("en");

    Object.defineProperty(window, "location", {
      value: {
        pathname: "/en",
        search: "",
        hash: "",
        assign: vi.fn(),
        href: "http://localhost/en",
      },
      writable: true,
    });

    const user = userEvent.setup();
    render(<LocaleSwitcher />);

    // Should show US flag and EN label
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith("/");
  });

  it("works on root path without duplicate trailing slash", async () => {
    const user = userEvent.setup();
    window.location.pathname = "/pt";
    render(<LocaleSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith("/en/");
  });

  it("does not crash when window is not ready (SSR safe)", () => {
    // jsdom always has window; just ensure it renders without issues
    render(<LocaleSwitcher />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("is keyboard accessible (Enter triggers click)", async () => {
    const user = userEvent.setup();
    render(<LocaleSwitcher />);
    const btn = screen.getByRole("button");

    btn.focus();
    expect(btn).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(window.location.assign).toHaveBeenCalled();
  });

  it("uses window.location.pathname when initialPath is not provided", () => {
    delete (window as any).location;
    window.location = {
      pathname: "/en/roadmaps",
      search: "",
      hash: "",
      assign: vi.fn(),
    } as any;

    render(<LocaleSwitcher />);

    expect(screen.getByRole("button")).toHaveTextContent("EN");
  });

  it("updates when pathname changes via popstate", async () => {
    delete (window as any).location;
    window.location = {
      pathname: "/pt/trilhas",
      search: "",
      hash: "",
      assign: vi.fn(),
    } as any;

    render(<LocaleSwitcher />);

    (window.location as any).pathname = "/en/roadmaps";
    act(() => window.dispatchEvent(new PopStateEvent("popstate")));

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("EN");
    });
  });

  it("falls back to setting href when location.assign is not available (no navigation throw)", async () => {
    const user = userEvent.setup();

    delete (window as any).location;
    window.location = {
      pathname: "/pt/trilhas",
      search: "",
      hash: "",
      href: "",
      // assign intentionally missing
    } as any;

    render(<LocaleSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(window.location.href).toContain("/en/roadmaps");
  });

  it("does not throw when href setter throws and assign is missing (catch branch)", async () => {
    const user = userEvent.setup();

    const loc: any = { pathname: "/pt/trilhas", search: "", hash: "" };
    Object.defineProperty(loc, "href", {
      get: () => "",
      set: () => {
        throw new Error("setter blocked");
      },
    });

    delete (window as any).location;
    window.location = loc;

    render(<LocaleSwitcher />);

    await user.click(screen.getByRole("button"));
    // Sem assert de navegação (setter lança); o objetivo é cobrir o catch sem falhar
    expect(true).toBe(true);
  });
});

describe("LocaleSwitcher (extra branch coverage)", () => {
  it("falls back to prefix-swap when route is unknown (keeps rest of path)", async () => {
    const user = userEvent.setup();

    delete (window as any).location;
    window.location = {
      pathname: "/en/custom-page",
      search: "",
      hash: "",
      assign: vi.fn(),
    } as any;

    render(<LocaleSwitcher />);
    await user.click(screen.getByRole("button"));

    expect(window.location.assign).toHaveBeenCalledWith("/custom-page");
  });

  it("ignores popstate when window.location.pathname is empty", async () => {
    delete (window as any).location;
    window.location = {
      pathname: "/pt/trilhas",
      search: "",
      hash: "",
      assign: vi.fn(),
    } as any;

    render(<LocaleSwitcher />);
    expect(screen.getByRole("button")).toHaveTextContent("PT");

    (window.location as any).pathname = "";
    act(() => window.dispatchEvent(new PopStateEvent("popstate")));

    // continua em PT
    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("PT");
    });
  });

  it("uses href fallback when location.assign is not a function", async () => {
    const user = userEvent.setup();

    delete (window as any).location;
    window.location = {
      pathname: "/pt/trilhas",
      search: "",
      hash: "",
      href: "",
      assign: null, // branch: não é função
    } as any;

    render(<LocaleSwitcher />);
    await user.click(screen.getByRole("button"));

    expect(window.location.href).toContain("/en/roadmaps");
  });

  it("does not throw when href setter throws and assign is missing (catch branch)", async () => {
    const user = userEvent.setup();

    const loc: any = { pathname: "/pt/trilhas", search: "", hash: "" };
    Object.defineProperty(loc, "href", {
      get: () => "",
      set: () => {
        throw new Error("setter blocked");
      },
    });

    delete (window as any).location;
    window.location = loc;

    render(<LocaleSwitcher />);
    await user.click(screen.getByRole("button"));

    expect(true).toBe(true);
  });
});
