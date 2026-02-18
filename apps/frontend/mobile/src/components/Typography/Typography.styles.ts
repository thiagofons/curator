import { StyleSheet } from "react-native";

export const typographyStyles = StyleSheet.create({
  // --- Display ---
  "display-h1": {
    fontFamily: "Lexend_700Bold", // Substitui fontWeight: "700"
    fontSize: 48, // 3rem
    lineHeight: 52.8, // 1.1 * 48
    letterSpacing: -0.96, // -0.02em de 48
  },

  // --- Heading ---
  "heading-h2": {
    fontFamily: "Lexend_600SemiBold", // Substitui fontWeight: "600"
    fontSize: 36, // 2.25rem
    lineHeight: 43.2, // 1.2 * 36
    letterSpacing: -0.36, // -0.01em de 36
  },
  "heading-h3": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 24,
    lineHeight: 31.92, // 1.33 * 24
  },
  "heading-h4": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 20,
    lineHeight: 28, // 1.4 * 20
  },

  // --- Subheading ---
  "subheading-xl": {
    fontFamily: "Lexend_500Medium", // Substitui fontWeight: "500"
    fontSize: 24,
    lineHeight: 31.2, // 1.3 * 24
  },
  "subheading-lg": {
    fontFamily: "Lexend_500Medium",
    fontSize: 20,
    lineHeight: 28, // 1.4 * 20
  },
  "subheading-md": {
    fontFamily: "Lexend_500Medium",
    fontSize: 18,
    lineHeight: 25.2, // 1.4 * 18
  },
  "subheading-sm": {
    fontFamily: "Lexend_500Medium",
    fontSize: 16,
    lineHeight: 16, // 1.0 * 16
  },
  "subheading-xs": {
    fontFamily: "Lexend_500Medium",
    fontSize: 14,
    lineHeight: 14, // 1.0 * 14
  },

  // --- Body ---
  "body-large": {
    fontFamily: "Lexend_400Regular", // Substitui fontWeight: "400"
    fontSize: 18,
    lineHeight: 28.8, // 1.6 * 18
  },
  "body-base": {
    fontFamily: "Lexend_400Regular",
    fontSize: 16,
    lineHeight: 24, // 1.5 * 16
  },
  "body-small": {
    fontFamily: "Lexend_400Regular",
    fontSize: 14,
    lineHeight: 19.6, // 1.4 * 14
  },

  // --- Button ---
  "btn-text": {
    fontFamily: "Lexend_600SemiBold",
    fontSize: 16,
    lineHeight: 20, // Aumentado de 16 para 20 (ou 24) para dar espaço às letras
    letterSpacing: 0.16,
    includeFontPadding: false, // <-- CRUCIAL: Remove o padding fantasma do Android
    textAlignVertical: "center", // Ajuda na centralização vertical perfeita no Android
  },
});

export type TypographyVariant = keyof typeof typographyStyles;
