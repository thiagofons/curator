/**
 * Primitive/Brand colors from the Curator design system.
 * These are the raw color values defined in globals.css.
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
 * These map to CSS custom properties and change based on theme.
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

/**
 * Mapping of theme colors to Tailwind CSS classes.
 * Used internally by components to apply correct styles.
 */
export const themeColorClasses: Record<ThemeColor, string> = {
  // Semantic colors (theme-aware)
  background: "text-background",
  foreground: "text-foreground",
  primary: "text-primary",
  "primary-foreground": "text-primary-foreground",
  secondary: "text-secondary",
  "secondary-foreground": "text-secondary-foreground",
  muted: "text-muted",
  "muted-foreground": "text-muted-foreground",
  accent: "text-accent",
  "accent-foreground": "text-accent-foreground",
  destructive: "text-destructive",
  "destructive-foreground": "text-destructive-foreground",
  border: "text-border",
  card: "text-card",
  "card-foreground": "text-card-foreground",
  popover: "text-popover",
  "popover-foreground": "text-popover-foreground",

  // Primitive/Brand colors (fixed)
  white: "text-white",
  black: "text-black",
  "brand-blue": "text-brand-blue",
  "brand-blue-dark": "text-brand-blue-dark",
  "gray-lighter": "text-gray-lighter",
  "gray-light": "text-gray-light",
  "gray-normal": "text-gray-normal",
  "gray-dark": "text-gray-dark",
  "status-green": "text-status-green",
  "status-red": "text-status-red",
} as const;
