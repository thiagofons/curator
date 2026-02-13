import type {
  PrimitiveColor,
  SemanticColor,
  ThemeColor,
} from "../types/theme-colors";

// -----------------------------------------------------------------------
// Primitive tokens — fixed brand colors, same in light and dark
// Source: packages/ui-web/src/globals.css
// -----------------------------------------------------------------------

export const primitiveColors: Record<PrimitiveColor, string> = {
  white: "#ffffff",
  black: "#000000",
  "brand-blue": "#0060f7", // hsl(217 100% 48%)
  "brand-blue-dark": "#001028", // hsl(216 100% 8%)
  "gray-lighter": "#eeeeee", // hsl(0 0% 93%)
  "gray-light": "#d5d5d5", // hsl(0 0% 84%)
  "gray-normal": "#4b5563", // hsl(215 14% 34%)
  "gray-dark": "#000000", // hsl(0 0% 0%)
  "status-green": "#34c759", // hsl(135 59% 49%)
  "status-red": "#ff383c", // hsl(359 100% 61%)
};

// -----------------------------------------------------------------------
// Semantic tokens — light mode
// -----------------------------------------------------------------------

export const lightSemanticColors: Record<SemanticColor, string> = {
  background: "#ffffff",
  foreground: "#001028",
  primary: "#0060f7",
  "primary-foreground": "#ffffff",
  secondary: "#4b5563",
  "secondary-foreground": "#001028",
  muted: "#eeeeee",
  "muted-foreground": "#4b5563",
  accent: "#eeeeee",
  "accent-foreground": "#0060f7",
  destructive: "#ff383c",
  "destructive-foreground": "#ffffff",
  border: "#d5d5d5",
  card: "#ffffff",
  "card-foreground": "#001028",
  popover: "#ffffff",
  "popover-foreground": "#001028",
};

// -----------------------------------------------------------------------
// Semantic tokens — dark mode
// -----------------------------------------------------------------------

export const darkSemanticColors: Record<SemanticColor, string> = {
  background: "#1a1a1a", // hsl(0 0% 10%)
  foreground: "#ffffff",
  primary: "#0060f7",
  "primary-foreground": "#ffffff",
  secondary: "#4b5563",
  "secondary-foreground": "#ffffff",
  muted: "#001f4d", // hsl(216 100% 15%)
  "muted-foreground": "#999999", // hsl(0 0% 60%)
  accent: "#001f4d",
  "accent-foreground": "#ffffff",
  destructive: "#ff383c",
  "destructive-foreground": "#ffffff",
  border: "#4b5563",
  card: "#001433", // hsl(216 100% 10%)
  "card-foreground": "#ffffff",
  popover: "#001433",
  "popover-foreground": "#ffffff",
};

// -----------------------------------------------------------------------
// Merged theme color maps (primitive + semantic)
// -----------------------------------------------------------------------

export type ThemeColors = Record<ThemeColor, string>;

export const lightColors: ThemeColors = {
  ...primitiveColors,
  ...lightSemanticColors,
};

export const darkColors: ThemeColors = {
  ...primitiveColors,
  ...darkSemanticColors,
};
