// src/components/Typography/styles.ts
import { StyleSheet } from "react-native";

export const typographyStyles = StyleSheet.create({
  // --- Display ---
  "display-h1": {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "500", // Lexend Medium
    letterSpacing: -1,
  },
  // --- Heading ---
  "heading-h2": { fontSize: 32, lineHeight: 40, fontWeight: "500" },
  "heading-h3": { fontSize: 24, lineHeight: 32, fontWeight: "500" },
  "heading-h4": { fontSize: 20, lineHeight: 28, fontWeight: "500" },

  // --- Subheading ---
  "subheading-xl": { fontSize: 18, lineHeight: 26, fontWeight: "400" },
  "subheading-lg": { fontSize: 16, lineHeight: 24, fontWeight: "500" },
  "subheading-sm": {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // --- Body ---
  "body-large": { fontSize: 18, lineHeight: 26, fontWeight: "400" },
  "body-base": { fontSize: 16, lineHeight: 24, fontWeight: "400" },
  "body-small": { fontSize: 14, lineHeight: 20, fontWeight: "400" },

  // --- Button ---
  "btn-text": {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.25,
  },
});

export type TypographyVariant = keyof typeof typographyStyles;
