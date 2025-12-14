// @vitest-environment node
import { defaultLang } from "@/i18n/ui";
import {
  getLangFromUrl,
  useTranslatedPath,
  useTranslations,
} from "@/i18n/utils";

describe("i18n/utils", () => {
  describe("getLangFromUrl", () => {
    it("returns the correct language when it is valid in the URL", () => {
      const url = new URL("https://curator.com/en/trilha-mpb");
      expect(getLangFromUrl(url)).toBe("en");
    });

    it("returns defaultLang when the language in the URL is invalid or missing", () => {
      const invalid = new URL("https://curator.com/fr/trilha-mpb");
      expect(getLangFromUrl(invalid)).toBe(defaultLang);

      const root = new URL("https://curator.com/");
      expect(getLangFromUrl(root)).toBe(defaultLang);
    });
  });

  describe("useTranslations", () => {
    it("returns the correct translation for the specified language (pt)", () => {
      const t = useTranslations("pt");
      expect(t("nav.home")).toBe("Início");
    });

    it("returns the correct translation for the specified language (en)", () => {
      const t = useTranslations("en");
      expect(t("nav.about")).toBe("About");
    });

    it("falls back to defaultLang (pt) when the key is missing in the current language (en)", () => {
      const mockUi = {
        en: {
          "nav.only_in_pt": null,
        },
        pt: {
          "nav.only_in_pt": "Apenas em Português",
        },
      } as const;

      const useTranslationsMock = (lang: keyof typeof mockUi) => {
        return function t(key: keyof (typeof mockUi)["pt"]) {
          return ((mockUi[lang] as Record<string, string | null>)[key] ??
            (mockUi.pt as Record<string, string>)[
              key
            ]) as (typeof mockUi)["pt"][typeof key];
        };
      };

      const t = useTranslationsMock("en");
      expect(t("nav.only_in_pt")).toBe("Apenas em Português");
    });
  });

  describe("useTranslatedPath", () => {
    const translatePathDefault = useTranslatedPath(defaultLang);

    it("translates to a non-default language (en), prefixing with the language", () => {
      const translateToEn = useTranslatedPath("en");
      expect(translateToEn("/trilhas")).toBe("/en/trilhas");
    });

    it("translates to defaultLang (pt) without prefixing when showDefaultLang is false", () => {
      expect(translatePathDefault("/trilhas")).toBe("/trilhas");
    });
  });
});
