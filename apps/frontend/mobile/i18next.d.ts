import "i18next";
import ptCommon from "./src/assets/locales/pt/common.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof ptCommon;
    };
  }
}
