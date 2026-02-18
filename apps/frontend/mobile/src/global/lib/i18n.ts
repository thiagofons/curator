import enCommon from "@/assets/locales/en/common.json";
import ptCommon from "@/assets/locales/pt/common.json";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: enCommon,
  },
  pt: {
    translation: ptCommon,
  },
};

// Detect device language
const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? "pt";
const supportedLanguages = ["en", "pt"];
const initialLanguage = supportedLanguages.includes(deviceLanguage)
  ? deviceLanguage
  : "pt";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "pt",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
