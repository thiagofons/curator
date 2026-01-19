import { APP_ROUTES } from "@/constants/routes";

type AppRoutesType = typeof APP_ROUTES;

export type SectionId = {
  [K in keyof AppRoutesType]: AppRoutesType[K] extends { sections: infer S }
    ? S[keyof S]
    : never;
}[keyof AppRoutesType];

export const scrollToSection = (sectionId: SectionId) => {
  console.log("Scrolling to section:", sectionId);
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);

  if (element) {
    const headerOffset = 80;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    if (import.meta.env.DEV) {
      console.warn(
        `Tentativa de scroll falhou: Elemento com id "${sectionId}" não encontrado na página atual.`,
      );
    }
  }
};
