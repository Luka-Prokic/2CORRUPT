import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import IButton from "../ui/buttons/IButton";
import { Text } from "react-native";

interface StashButtonProps {
  onPress: () => void;
}

export default function StashButton({ onPress }: StashButtonProps) {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
  

  return (
    <IButton
      onPress={onPress}
      style={{
        width: "100%",
        height: 64,
        borderRadius: 100,
        backgroundColor: theme.accent,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.border }}>
        DashBoard
      </Text>
      <Ionicons name="chevron-forward" size={24} color={theme.border} />
    </IButton>
  );
}
