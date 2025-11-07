// /packages/ui-tokens/src/colors.ts

/**
 * ========================================================================
 * CURATOR DESIGN TOKENS: COLORS
 * ========================================================================
 *
 * Esta é a fonte única da verdade para todas as cores da plataforma.
 *
 * - `brand`: Cores que definem a identidade "Curator".
 * - `neutral`: A escala de cinza, usada para textos, fundos e bordas.
 * - `feedback`: Cores usadas para comunicar estados do sistema (sucesso, erro, etc.).
 *
 * Referência: Nossos pilares de DX e Linguagem Ubíqua.
 */

export const colors = {
  /**
   * Cores da Marca: A identidade principal do Curator.
   * Usamos nomes semânticos (ex: 'primary') em vez de nomes de cor (ex: 'blue').
   */
  brand: {
    /**
     * O 'Azul Curator'. Usado para ações principais, links e foco.
     */
    primary: "#0A7CFF",
    /**
     * O 'Dourado Curator'. Usado para destaques, selos e elementos premium.
     */
    secondary: "#FFB800",
    /**
     * Um tom mais claro do azul principal, usado para fundos de containers
     * ou estados 'hover' mais suaves.
     */
    primaryLight: "#E6F2FF",
  },

  /**
   * Cores Neutras: A base da nossa UI.
   * Usamos uma escala numérica (inspirada no Tailwind) onde
   * 900 é o mais escuro e 100 é o mais claro.
   */
  neutral: {
    /**
     * Usado para textos com alto contraste (ex: títulos).
     */
    900: "#121212",
    /**
     * Usado para textos de corpo e sub-títulos.
     */
    700: "#333333",
    /**
     * Usado para textos de apoio, placeholders e ícones desabilitados.
     */
    500: "#888888",
    /**
     * Usado para bordas de containers e divisores.
     */
    300: "#DDDDDD",
    /**
     * Usado para fundos de página (modo claro) ou elementos sutilmente destacados.
     */
    100: "#F5F5F5",
    /**
     * Oposto direto do 900.
     */
    white: "#FFFFFF",
  },

  /**
   * Cores de Feedback: Para comunicação de estado com o usuário.
   */
  feedback: {
    /**
     * Usado para mensagens de sucesso e validação positiva.
     */
    success: "#00C853",
    /**
     * Usado para alertas, avisos e informações que exigem atenção.
     */
    warning: "#FFD600",
    /**
     * Usado para mensagens de erro, validação negativa e ações destrutivas.
     */
    error: "#D50000",
    /**
     * Usado para informações contextuais (ex: 'InfoSteps' em uma Trilha).
     */
    info: "#0091EA",
  },
} as const; // 1. NOTA TÉCNICA IMPORTANTE
