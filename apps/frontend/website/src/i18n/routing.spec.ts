import {
  getAllLocalizedVersions,
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
