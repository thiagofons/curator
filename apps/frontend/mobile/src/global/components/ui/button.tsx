import { useColors } from "@/global/hooks/use-colors";
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
} from "./button.styles";

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
    const colors = useColors();

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
