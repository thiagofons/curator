/**
 * Primitive/Brand colors from the Curator design system.
 * These are the raw color values defined as fixed hex values.
 */
export type PrimitiveColor =
  | "white"
  | "black"
  | "brand-blue"
  | "brand-blue-dark"
  | "gray-lighter"
  | "gray-light"
  | "gray-normal"
  | "gray-dark"
  | "status-green"
  | "status-red";

/**
 * Semantic colors that adapt to light/dark theme.
 * These map to CSS custom properties (web) or color scheme tokens (mobile).
 */
export type SemanticColor =
  | "background"
  | "foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground";

/**
 * All available theme colors for the Curator design system.
 * Use semantic colors for theme-aware styling (recommended).
 * Use primitive colors for fixed brand elements.
 */
export type ThemeColor = SemanticColor | PrimitiveColor;

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
// Semantic tokens — dark mode (Refined for 2026 Branding)
// -----------------------------------------------------------------------

export const darkSemanticColors: Record<SemanticColor, string> = {
  background: "#020817",
  foreground: "#f8fafc",
  primary: "#0060f7",
  "primary-foreground": "#ffffff",
  secondary: "#1e293b",
  "secondary-foreground": "#f1f5f9",
  muted: "#0f172a",
  "muted-foreground": "#94a3b8",
  accent: "#1d4ed8",
  "accent-foreground": "#ffffff",
  destructive: "#ef4444",
  "destructive-foreground": "#ffffff",
  border: "#1e293b",
  card: "#030e21",
  "card-foreground": "#f8fafc",
  popover: "#030e21",
  "popover-foreground": "#f8fafc",
};

export type ThemeColors = Record<ThemeColor, string>;

export const lightColors: ThemeColors = {
  ...primitiveColors,
  ...lightSemanticColors,
};

export const darkColors: ThemeColors = {
  ...primitiveColors,
  ...darkSemanticColors,
};
