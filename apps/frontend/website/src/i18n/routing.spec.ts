import {
  getAllLocalizedVersions,
  getLocaleFromPath,
  getRouteKeyFromPath,
  removeLocalePrefix,
  switchLocale,
} from "./routing";

describe("i18n/routing", () => {
  it("removeLocalePrefix removes any locale prefix (including default)", () => {
    expect(removeLocalePrefix("/en/about")).toBe("/about");
    expect(removeLocalePrefix("/pt/trilhas")).toBe("/trilhas");
    expect(removeLocalePrefix("/")).toBe("/");
  });

  it("getRouteKeyFromPath tolerates trailing slashes and /pt prefix", () => {
    expect(getRouteKeyFromPath("/en/roadmaps/")).toBe("roadmaps");
    expect(getRouteKeyFromPath("/pt/trilhas")).toBe("roadmaps");
    expect(getRouteKeyFromPath("/pt/")).toBe("home");
  });

  it("switchLocale switches known routes and falls back to home when unknown", () => {
    expect(switchLocale("/pt/trilhas", "en")).toBe("/en/roadmaps");
    expect(switchLocale("/nao-existe", "en")).toBe("/en");
  });

  it("getAllLocalizedVersions returns all locale variants", () => {
    expect(getAllLocalizedVersions("about")).toEqual({
      pt: "/sobre",
      en: "/en/about",
    });
  });
});

describe("i18n/routing (branches)", () => {
  it("removeLocalePrefix keeps path when there is no locale prefix", () => {
    expect(removeLocalePrefix("/blog")).toBe("/blog");
  });

  it("removeLocalePrefix handles bare locale paths", () => {
    expect(removeLocalePrefix("/en")).toBe("/");
    expect(removeLocalePrefix("/en/")).toBe("/");
  });

  it("getLocaleFromPath falls back to default locale on non-locale segment", () => {
    expect(getLocaleFromPath("/foo")).toBe("pt");
  });

  it("getRouteKeyFromPath returns null for unknown paths", () => {
    expect(getRouteKeyFromPath("/en/unknown-route")).toBeNull();
  });

  it("removeLocalePrefix returns original pathname for default-locale paths without explicit prefix", () => {
    expect(removeLocalePrefix("/sobre")).toBe("/sobre");
    expect(removeLocalePrefix("/trilhas")).toBe("/trilhas");
  });

  it("getRouteKeyFromPath matches routes even with trailing slashes", () => {
    expect(getRouteKeyFromPath("/en/roadmaps/")).toBe("roadmaps");
    expect(getRouteKeyFromPath("/sobre/")).toBe("about");
  });

  it("switchLocale falls back to home when routeKey is null", () => {
    expect(switchLocale("/rota-inexistente", "pt")).toBe("/");
    expect(switchLocale("/rota-inexistente", "en")).toBe("/en");
  });

  it("getLocaleFromPath treats explicit default locale prefix as default", () => {
    expect(getLocaleFromPath("/pt/sobre")).toBe("pt");
  });
});

describe("i18n/routing (extra branch coverage)", () => {
  it("removeLocalePrefix removes default locale prefix too", () => {
    expect(removeLocalePrefix("/pt/trilhas")).toBe("/trilhas");
    expect(removeLocalePrefix("/pt")).toBe("/");
    expect(removeLocalePrefix("/pt/")).toBe("/");
  });

  it("getRouteKeyFromPath handles default-locale prefix and trailing slashes", () => {
    expect(getRouteKeyFromPath("/pt/trilhas")).toBe("roadmaps");
    expect(getRouteKeyFromPath("/sobre/")).toBe("about");
  });

  it("switchLocale falls back to home when route is unknown", () => {
    expect(switchLocale("/rota-inexistente", "pt")).toBe("/");
    expect(switchLocale("/rota-inexistente", "en")).toBe("/en");
  });

  it("getAllLocalizedVersions covers reduce path for all locales", () => {
    expect(getAllLocalizedVersions("home")).toEqual({ pt: "/", en: "/en" });
  });

  it("getLocaleFromPath returns default locale when segment is not a locale", () => {
    expect(getLocaleFromPath("/foo/bar")).toBe("pt");
  });
});
