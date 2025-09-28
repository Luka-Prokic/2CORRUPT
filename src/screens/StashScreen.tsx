import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";

export default function StashScreen() {
  const { theme } = useTheme();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.primaryBackground,
      }}
    >
      <Text style={{ color: theme.text, fontSize: 18 }}>Stash Screen</Text>
    </View>
  );
}
