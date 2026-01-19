import { APP_ROUTES } from "@/constants/routes"; // Ajuste o caminho do import

// --- 1. Mágica do TypeScript para extrair os IDs ---

// Pega o tipo do objeto inteiro
type AppRoutesType = typeof APP_ROUTES;

// Itera sobre as chaves (COMMON, HOME, etc) e extrai os valores de 'sections'
export type SectionId = {
  [K in keyof AppRoutesType]: AppRoutesType[K] extends { sections: infer S }
    ? S[keyof S] // Retorna os valores dentro de sections
    : never;
}[keyof AppRoutesType];

// O tipo SectionId agora é automaticamente:
// "navbar" | "footer" | "cta" | "download" | "hero" | "social_media_vs_curator" | ...

// --- 2. A Função de Scroll ---

export const scrollToSection = (sectionId: SectionId) => {
  // Segurança para não quebrar no Server-Side Rendering (Astro/Next)
  console.log("Scrolling to section:", sectionId);
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);

  if (element) {
    // Altura da sua navbar fixa para não cobrir o título da seção
    // Dica: Você pode pegar isso dinamicamente se preferir, ou deixar fixo
    const headerOffset = 80;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    // Opcional: Log apenas em desenvolvimento para debug
    if (import.meta.env.DEV) {
      console.warn(
        `Tentativa de scroll falhou: Elemento com id "${sectionId}" não encontrado na página atual.`,
      );
    }
  }
};
