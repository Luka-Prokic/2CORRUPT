import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../config/ThemeContext";
import AppearanceSettings from "../components/app-settings/AppearanceSettings";
import PickLanguageButton from "../components/app-settings/PickLanguageButton";
import IList from "../components/ui/containers/IList";

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.secondaryBackground,
        paddingHorizontal: "5%",
        flex: 1,
        paddingTop: 20,
      }}
    >
      <IList style={{ gap: 16 }} hrStart="None">
        <AppearanceSettings />

        <PickLanguageButton />
      </IList>
    </ScrollView>
  );
}
