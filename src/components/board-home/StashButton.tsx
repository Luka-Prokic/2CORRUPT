import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import IButton from "../ui/buttons/IButton";
import { Text } from "react-native";
import StashTittle from "./StashTittle";

interface StashButtonProps {
  onPress: () => void;
}

export default function StashButton({ onPress }: StashButtonProps) {
  const { themeName } = useSettingsStore();
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
      <StashTittle style={{ color: theme.border, fontSize: 22}} />
      <Ionicons name="chevron-forward" size={28} color={theme.border} />
    </IButton>
  );
}
