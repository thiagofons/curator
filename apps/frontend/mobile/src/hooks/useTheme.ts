// src/hooks/useTheme.ts
import { theme } from "@/constants/colors";
import { useColorScheme } from "react-native";

export function useTheme() {
  const colorScheme = useColorScheme();
  const colors = theme[colorScheme ?? "light"];

  return {
    colors,
    isDark: colorScheme === "dark",
  };
}
