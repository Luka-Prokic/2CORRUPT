import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";

export default function WorkoutScreen() {
  const { theme } = useSettingsStore();

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Workout Screens
        </Text>
      </View>
    </SafeAreaView>
  );
}
