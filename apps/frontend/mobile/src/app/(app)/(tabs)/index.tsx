import { StyleSheet, View } from "react-native";

import { Display } from "@/global/components/ui/typography";
import { useTranslation } from "react-i18next";

export default function TabOneScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Display>{t("tab_one")}</Display>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
