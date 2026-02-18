import { useTheme } from "@/hooks/useTheme"; // Ajuste para o caminho correto do seu hook
import React, { ComponentRef, forwardRef } from "react";
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  baseStyles,
  getButtonVariantStyle,
  getTextVariantStyle,
  sizeStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./Button.styles";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  children?: React.ReactNode;
  /** Permite sobrescrever o estilo do container do botão */
  style?: StyleProp<ViewStyle>;
  /** Permite sobrescrever o estilo do texto interno */
  textStyle?: StyleProp<TextStyle>;
}

export const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      label,
      children,
      style,
      textStyle,
      disabled,
      ...props
    },
    ref,
  ) => {
    // 1. Extraímos as cores baseadas no esquema atual (light/dark)
    const { colors } = useTheme();

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        style={({ pressed }) => [
          baseStyles.button,
          sizeStyles[size],
          // 2. Resolvemos as cores passando as cores do tema e o estado
          getButtonVariantStyle(colors, variant, pressed),
          disabled && baseStyles.disabled,
          style, // Custom overrides por último
        ]}
        {...props}
      >
        {({ pressed }) => {
          if (label) {
            return (
              <Text
                style={[
                  baseStyles.text,
                  // 3. Resolvemos a cor do texto também dinamicamente
                  getTextVariantStyle(colors, variant, pressed),
                  textStyle,
                ]}
              >
                {label}
              </Text>
            );
          }

          return typeof children === "function"
            ? children({ pressed })
            : children;
        }}
      </Pressable>
    );
  },
);

Button.displayName = "Button";
