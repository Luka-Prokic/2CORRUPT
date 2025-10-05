import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";

const AllScreen = () => {
  const { theme } = useSettingsStore();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.primaryBackground }}
    ></SafeAreaView>
  );
};

export default AllScreen;
