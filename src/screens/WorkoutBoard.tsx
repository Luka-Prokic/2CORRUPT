import React from "react";
import { useSettingsStore } from "../stores/settingsStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutBoard() {
  const { theme } = useSettingsStore();

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background, flex: 1 }}
    ></SafeAreaView>
  );
}
