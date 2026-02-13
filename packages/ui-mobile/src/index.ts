// Re-export shared design tokens for convenience
export type {
  ThemeColor,
  PrimitiveColor,
  SemanticColor,
} from "@repo/ui/types/theme-colors";
export {
  primitiveColors,
  lightColors,
  darkColors,
} from "@repo/ui/theme/colors";
export type { ThemeColors } from "@repo/ui/theme/colors";

// Mobile-specific exports
export { useThemeColors } from "./hooks/useThemeColors";
export { useLexendFonts } from "./hooks/useLexendFonts";
export type { LexendFontResult } from "./hooks/useLexendFonts";
export { typographyVariants } from "./theme/typography-styles";
export type { TypographyVariant } from "./theme/typography-styles";
export {
  Typography,
  Display,
  H2,
  H3,
  H4,
  SubheadingXL,
  SubheadingLG,
  SubheadingMD,
  SubheadingSM,
  SubheadingXS,
  BodyLarge,
  BodyBase,
  BodySmall,
  ButtonText,
} from "./components/Typography";
export type { TypographyProps } from "./components/Typography";
