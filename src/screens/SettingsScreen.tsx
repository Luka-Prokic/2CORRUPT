import React from "react";
import { ScrollView } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import Colors from "../config/constants/Colors";
import ThemeSettings from "../components/app-settings/ThemeSettings";
import IList from "../components/ui/containers/IList";
import LanguageSettings from "../components/app-settings/LanguageSettings";

export default function SettingsScreen() {
  const { themeName } = useSettingsStore();
  const theme = Colors[themeName];

  return (
    <ScrollView
      style={{
        backgroundColor: theme.navBackground,
        paddingHorizontal: "5%",
        flex: 1,
        paddingTop: 20,
      }}
    >
      <IList style={{ gap: 16 }} hrStart="None">
        <ThemeSettings />

        <LanguageSettings />
      </IList>
    </ScrollView>
  );
}
