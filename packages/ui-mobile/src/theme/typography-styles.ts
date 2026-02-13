import type { TextStyle } from "react-native";

export type TypographyVariant =
  | "display-h1"
  | "heading-h2"
  | "heading-h3"
  | "heading-h4"
  | "subheading-xl"
  | "subheading-lg"
  | "subheading-md"
  | "subheading-sm"
  | "subheading-xs"
  | "body-large"
  | "body-base"
  | "body-small"
  | "btn-text";

/**
 * Typography style definitions for React Native.
 * Font sizes mirror the web design tokens from packages/ui-web/tailwind.config.ts.
 *
 * Uses Lexend font family (loaded via useLexendFonts).
 * Each variant references the specific Lexend weight variant so iOS and Android
 * render the correct weight without relying on OS font synthesis.
 */
export const typographyVariants: Record<TypographyVariant, TextStyle> = {
  // max value of clamp(2rem, 4vw + 1rem, 3rem) → 48px
  "display-h1": {
    fontFamily: "Lexend_700Bold",
    fontSize: 48,
    lineHeight: 48 * 1.1,
    letterSpacing: -0.02 * 48,
  },
  // max value of clamp(1.5rem, 3vw + 1rem, 2.25rem) → 36px
  "heading-h2": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 36,
    lineHeight: 36 * 1.2,
    letterSpacing: -0.01 * 36,
  },
  "heading-h3": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 24,
    lineHeight: 24 * 1.33,
  },
  "heading-h4": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 20,
    lineHeight: 20 * 1.4,
  },
  "subheading-xl": {
    fontFamily: "Lexend_400Regular",
    fontSize: 24,
    lineHeight: 24 * 1.3,
  },
  "subheading-lg": {
    fontFamily: "Lexend_500Medium",
    fontSize: 20,
    lineHeight: 20 * 1.4,
  },
  "subheading-md": {
    fontFamily: "Lexend_400Regular",
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  "subheading-sm": {
    fontFamily: "Lexend_500Medium",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  "subheading-xs": {
    fontFamily: "Lexend_500Medium",
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
  "body-large": {
    fontFamily: "Lexend_400Regular",
    fontSize: 18,
    lineHeight: 18 * 1.6,
  },
  "body-base": {
    fontFamily: "Lexend_400Regular",
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  "body-small": {
    fontFamily: "Lexend_400Regular",
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  "btn-text": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.16,
  },
};
