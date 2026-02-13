// src/components/Typography/index.tsx
import { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { ColorValue, Text, TextProps } from "react-native";
import { typographyStyles, TypographyVariant } from "./Typography.styles";

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: keyof ThemeColors | ColorValue; // Permite token ou cor HEX
  children?: React.ReactNode;
  as?: React.ElementType; // Para casos de Animated.Text
}

export const Typography = ({
  variant = "body-base",
  color = "foreground",
  as: Component = Text,
  style,
  children,
  ...props
}: TypographyProps) => {
  const { colors } = useTheme();

  // Resolve a cor: verifica se é um token (primary) ou cor real (#000)
  const textColor = (colors[color as keyof ThemeColors] || color) as ColorValue;

  return (
    <Component
      style={[
        { color: textColor },
        typographyStyles[variant],
        style, // Permite sobrescrever estilos pontualmente
      ]}
      {...props}
    >
      {children}
    </Component>
  );
};
