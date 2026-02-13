// src/constants/colors.ts

// 1. Primitives: Cores puras (Sua paleta "Curator")
const primitives = {
  brandBlue: "#0060f7",
  brandBlueDark: "#001028",
  grayLighter: "#eeeeee",
  grayLight: "#d5d5d5",
  grayNormal: "#4b5563",
  grayBg: "#1a1a1a",
  white: "#ffffff",
  black: "#000000",
  statusGreen: "#34c759",
  statusRed: "#ff383c",
};

// 2. Semantic Tokens: Mapeamento por tema
export const theme = {
  light: {
    background: primitives.white,
    foreground: primitives.brandBlueDark,
    primary: primitives.brandBlue,
    primaryForeground: primitives.white,
    muted: primitives.grayLighter,
    mutedForeground: primitives.grayNormal,
    border: primitives.grayLight,
    destructive: primitives.statusRed,
    // ... adicione os outros conforme seu CSS
  },
  dark: {
    background: primitives.grayBg,
    foreground: primitives.white,
    primary: primitives.brandBlue,
    primaryForeground: primitives.white,
    muted: "#1a1a1a", // Ajuste conforme necessário
    mutedForeground: "#999999",
    border: primitives.grayNormal,
    destructive: primitives.statusRed,
  },
};

export type ThemeColors = typeof theme.light;
