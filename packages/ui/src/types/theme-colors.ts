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
