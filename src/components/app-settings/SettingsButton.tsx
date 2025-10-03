import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";

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
    <TouchableOpacity
      onPress={handlePress}
      style={{
        paddingTop: 22,
        paddingRight: 22,
      }}
    >
      <Ionicons name="cog-outline" size={44} color={theme.grayText} />
    </TouchableOpacity>
  );
}
