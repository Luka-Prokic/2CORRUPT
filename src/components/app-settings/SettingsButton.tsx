import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore"; import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";

interface SettingsButtonProps {
  onPress?: () => void;
}

export default function SettingsButton({ onPress }: SettingsButtonProps) {
  const { themeName } = useThemeStore(); const theme = Colors[themeName];
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
      <Ionicons name="cog-outline" size={34} color={theme.grayText} />
    </TouchableOpacity>
  );
}
