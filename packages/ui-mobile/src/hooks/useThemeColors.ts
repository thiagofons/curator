import { useColorScheme } from "react-native";

import {
  darkColors,
  lightColors,
  type ThemeColors,
} from "@repo/ui/theme/colors";

export { type ThemeColors };

/**
 * Returns the active theme color map based on the system color scheme.
 * Semantic colors (foreground, background, etc.) will switch between
 * light and dark values automatically.
 *
 * @example
 * const colors = useThemeColors();
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.foreground }}>Hello</Text>
 * </View>
 */
export const useThemeColors = (): ThemeColors => {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkColors : lightColors;
};
