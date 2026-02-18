import React from "react";
import { Text, type TextProps, type TextStyle } from "react-native";

import { ThemeColor } from "@/constants/colors";
import { useThemeColors } from "@/hooks";
import { type TypographyVariant, typographyStyles } from "./Typography.styles";

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: ThemeColor;
  children?: React.ReactNode;
}

/**
 * Base Typography component. For better DX use the semantic wrappers below
 * (Display, H2, H3, etc.) instead of this directly.
 *
 * @example
 * <Typography variant="heading-h2" color="primary">Section</Typography>
 */
export const Typography = ({
  variant = "body-base",
  color = "black",
  style,
  children,
  ...props
}: TypographyProps) => {
  const colors = useThemeColors();

  const resolvedStyle: TextStyle = {
    ...typographyStyles[variant],
    color: colors[color],
  };

  return (
    <Text style={[resolvedStyle, style]} {...props}>
      {children}
    </Text>
  );
};

// -----------------------------------------------------------------------
// Semantic wrapper components — mirror the ui-web API
// -----------------------------------------------------------------------

export const Display = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="display-h1" color={color} {...props} />
);

export const H2 = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="heading-h2" color={color} {...props} />
);

export const H3 = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="heading-h3" color={color} {...props} />
);

export const H4 = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="heading-h4" color={color} {...props} />
);

export const SubheadingXL = ({
  color = "secondary",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="subheading-xl" color={color} {...props} />
);

export const SubheadingLG = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="subheading-lg" color={color} {...props} />
);

export const SubheadingMD = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="subheading-md" color={color} {...props} />
);

export const SubheadingSM = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="subheading-sm" color={color} {...props} />
);

export const SubheadingXS = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="subheading-xs" color={color} {...props} />
);

export const BodyLarge = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="body-large" color={color} {...props} />
);

export const BodyBase = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="body-base" color={color} {...props} />
);

export const BodySmall = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="body-small" color={color} {...props} />
);

export const ButtonText = ({
  color = "foreground",
  ...props
}: Omit<TypographyProps, "variant">) => (
  <Typography variant="btn-text" color={color} {...props} />
);
