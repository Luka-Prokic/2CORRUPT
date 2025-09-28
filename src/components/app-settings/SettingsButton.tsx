import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeContext";
import { useNavigation } from "@react-navigation/native";

interface SettingsButtonProps {
  onPress?: () => void;
}

export default function SettingsButton({ onPress }: SettingsButtonProps) {
  const { theme } = useTheme();
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
        paddingHorizontal: 10,
      }}
    >
      <Ionicons name="cog-outline" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}
