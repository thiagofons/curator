import { StyleSheet, View } from "react-native";

import { Display } from "@/global/components/ui/typography";
import { useTranslation } from "react-i18next";

export default function TabTwoScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Display>{t("tab_two")}</Display>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
