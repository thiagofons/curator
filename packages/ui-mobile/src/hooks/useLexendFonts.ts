import {
  useFonts,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
} from "@expo-google-fonts/lexend";

export type LexendFontResult = {
  fontsLoaded: boolean;
  fontError: Error | null;
};

/**
 * Loads all Lexend font weights used by the Curator typography system.
 * Call this once at the root of your app and keep the splash screen visible
 * until `fontsLoaded` is true.
 *
 * Weights loaded: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold.
 *
 * @example
 * const { fontsLoaded, fontError } = useLexendFonts();
 */
export const useLexendFonts = (): LexendFontResult => {
  const [fontsLoaded, fontError] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  });

  return { fontsLoaded, fontError };
};
