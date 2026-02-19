import { AuthProvider } from "@/features/auth/context/auth-context";
import { appFonts } from "@/global/constants/fonts";
import i18n from "@/global/lib/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts(appFonts);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <I18nextProvider i18n={i18n}>
      {/* 1. O AuthProvider deve envolver toda a navegação */}
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </I18nextProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* 2. O Stack aqui apenas define as rotas.
          A lógica de proteção fica dentro de (app)/_layout.tsx */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </ThemeProvider>
  );
}
