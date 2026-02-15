import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import "./styles/global.css";

import {
  BodyBase,
  BodySmall,
  ButtonText,
  Display,
  H2,
  H3,
  H4,
  SubheadingLG,
  SubheadingMD,
  SubheadingSM,
  SubheadingXL,
  SubheadingXS,
  useLexendFonts,
  useThemeColors,
} from "@repo/ui-mobile";

SplashScreen.preventAutoHideAsync();

import { Button } from "@repo/ui";

// ... existing imports

export default function App() {
  const colors = useThemeColors();
  const { fontsLoaded, fontError } = useLexendFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={styles.container}
      onLayout={onLayoutRootView}
    >
      <Display>Stop consuming noise.</Display>
      <SubheadingXL>Start building wisdom.</SubheadingXL>

      <View style={styles.divider} />

      <H2>Universal Design System</H2>
      <Button
        label="Universal Button"
        onPress={() => console.log("Pressed!")}
      />
      <Button variant="secondary" label="Secondary" className="mt-4" />
      <Button variant="destructive" label="Destructive" className="mt-4" />
      <Button variant="outline" label="Outline" className="mt-4" />
      <Button variant="ghost" label="Ghost" className="mt-4" />

      <View style={styles.divider} />

      <H2>Curator Design System</H2>
      <H3>Typography Scale</H3>
      <H4>All variants below</H4>

      <View style={styles.divider} />

      <SubheadingLG>SubheadingLG — Section intro</SubheadingLG>
      <SubheadingMD>SubheadingMD — Descriptive text</SubheadingMD>
      <SubheadingSM>SubheadingSM — Label</SubheadingSM>
      <SubheadingXS>SubheadingXS — Micro label</SubheadingXS>

      <View style={styles.divider} />

      <BodyBase>
        BodyBase — The quick brown fox jumps over the lazy dog. Standard reading
        text for most content across the app.
      </BodyBase>
      <BodySmall color="muted-foreground">
        BodySmall — Secondary info, captions, footnotes.
      </BodySmall>

      <View style={styles.divider} />

      <ButtonText color="primary">ButtonText — Call to action</ButtonText>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#d5d5d5",
    marginVertical: 8,
  },
});
