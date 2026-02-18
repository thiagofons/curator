import { ThemeColors } from "@/constants/colors";
import { fontFamilies } from "@/constants/fonts";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export const baseStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  text: {
    fontFamily: fontFamilies.medium,
    fontWeight: "500",
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});

export const sizeStyles: Record<ButtonSize, ViewStyle> = {
  default: { minHeight: 44, paddingHorizontal: 24, paddingVertical: 10 }, // Reduzi um pouco o padding para não estourar a altura
  sm: { minHeight: 36, paddingHorizontal: 12, borderRadius: 6 },
  lg: { minHeight: 48, paddingHorizontal: 32, borderRadius: 6 },
  icon: { minHeight: 40, width: 40 },
};

// 3. Resolução Dinâmica do Container (Depende do Tema e Estado)
export const getButtonVariantStyle = (
  colors: ThemeColors,
  variant: ButtonVariant,
  isPressed: boolean,
): ViewStyle => {
  switch (variant) {
    case "default":
      return {
        backgroundColor: colors.primary,
        opacity: isPressed ? 0.8 : 1, // Simula o active:bg-primary/80
        ...baseStyles.shadow,
      };
    case "destructive":
      return {
        backgroundColor: colors.destructive,
        opacity: isPressed ? 0.8 : 1,
        ...baseStyles.shadow,
      };
    case "outline":
      return {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: isPressed ? colors.accent : colors.background,
        ...baseStyles.shadow,
      };
    case "secondary":
      return {
        backgroundColor: colors.secondary,
        opacity: isPressed ? 0.8 : 1,
        ...baseStyles.shadow,
      };
    case "ghost":
      return {
        backgroundColor: isPressed ? colors.accent : "transparent",
      };
    case "link":
      return {
        backgroundColor: "transparent",
        opacity: isPressed ? 0.8 : 1,
      };
  }
};

// 4. Resolução Dinâmica do Texto (Depende do Tema e Estado)
export const getTextVariantStyle = (
  colors: ThemeColors,
  variant: ButtonVariant,
  isPressed: boolean,
): TextStyle => {
  switch (variant) {
    case "default":
      return { color: colors["primary-foreground"] };
    case "destructive":
      return { color: colors["destructive-foreground"] };
    case "outline":
      return {
        color: isPressed ? colors["accent-foreground"] : colors.foreground,
      };
    case "secondary":
      return { color: colors["secondary-foreground"] };
    case "ghost":
      return {
        color: isPressed ? colors["accent-foreground"] : colors.foreground,
      };
    case "link":
      return { color: colors.primary, textDecorationLine: "underline" };
  }
};
