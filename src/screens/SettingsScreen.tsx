import React from "react";
import { Text, ScrollView } from "react-native";
import { useTheme } from "../config/ThemeContext";
import PickLanguageButton from "../components/profile-settings/PickLanguageButton";
import AppearanceSettings from "../components/profile-settings/AppearanceSettings";

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
      <AppearanceSettings />

      <PickLanguageButton />
    </ScrollView>
  );
}
