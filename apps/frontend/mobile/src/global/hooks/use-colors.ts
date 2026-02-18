import {
  darkColors,
  lightColors,
  ThemeColors,
} from "@/global/constants/colors";
import { useColorScheme } from "react-native";

/**
 * Returns the active theme color map based on the system color scheme.
 * Semantic colors (foreground, background, etc.) will switch between
 * light and dark values automatically.
 *
 * @example
 * const colors = useColors();
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.foreground }}>Hello</Text>
 * </View>
 */
export const useColors = (): ThemeColors => {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkColors : lightColors;
};
