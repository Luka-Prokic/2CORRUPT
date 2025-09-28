import React from "react";
import { View, Text } from "react-native";
import { useThemeStore } from "../stores/themeStore";
import Colors from "../config/constants/Colors";

export default function StashScreen() {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      
    </View>
  );
}
