import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import BounceButton from "../ui/buttons/BounceButton";

interface SettingsButtonProps {
  onPress?: () => void;
}

export default function SettingsButton({ onPress }: SettingsButtonProps) {
  const { themeName } = useSettingsStore();
  const theme = Colors[themeName];
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Settings" as never);
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
