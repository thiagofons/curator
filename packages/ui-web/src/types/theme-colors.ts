export type {
  PrimitiveColor,
  SemanticColor,
  ThemeColor,
} from "@repo/ui/types/theme-colors";

import type { ThemeColor } from "@repo/ui/types/theme-colors";

/**
 * Mapping of theme colors to Tailwind CSS classes.
 * Used internally by web components to apply correct styles.
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
