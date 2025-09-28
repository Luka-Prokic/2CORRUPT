import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore"; import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import IButton from "../ui/buttons/IButton";
import { View } from "react-native";
import { SCREEN_HEIGHT } from "../../config/dimensions";

interface StashButtonProps {
  onPress?: () => void;
}

export default function StashButton({ onPress }: StashButtonProps) {
  const { themeName } = useThemeStore(); const theme = Colors[themeName];
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Stash" as never);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 22,
        right: 22,
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: theme.shadow || "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 100,
      }}
    >
      <IButton
        onPress={handlePress}
        style={{
          width: 44,
          height: 44,
          borderRadius: 100,
          backgroundColor: theme.accent,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Ionicons name="chevron-forward" size={24} color={theme.border} />
      </IButton>
    </View>
  );
}
