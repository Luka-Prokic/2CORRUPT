import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import Colors from "../../config/constants/Colors";
import BounceButton from "../ui/buttons/BounceButton";
import { useRouter } from "expo-router";

interface SettingsButtonProps {
  onPress?: () => void;
}

export default function SettingsButton({ onPress }: SettingsButtonProps) {
  const { themeName } = useSettingsStore();
  const theme = Colors[themeName];
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("settings");
    }
  };

  return (
    <BounceButton
      onPress={handlePress}
      style={{
        marginTop: 22,
        marginRight: 22,
        backgroundColor: "transparent",
        borderRadius: 24,
        width: 44,
        height: 44,
      }}
    >
      <Ionicons name="cog-outline" size={44} color={theme.grayText} />
    </BounceButton>
  );
}
