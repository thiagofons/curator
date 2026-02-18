// src/hooks/useTheme.ts
import { useColorScheme } from "react-native";
import { useThemeColors } from "./useThemeColors";

export function useTheme() {
  const colorScheme = useColorScheme();
  const colors = useThemeColors();

  return {
    colors,
    isDark: colorScheme === "dark",
  };
}
