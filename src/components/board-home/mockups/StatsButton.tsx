import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import Colors from "../../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";

interface StatsButtonProps {
  onPress?: () => void;
}

export default function StatsButton({ onPress }: StatsButtonProps) {
  const { themeName } = useSettingsStore();
  const theme = Colors[themeName];
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Stats" as never);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        padding: 10,
      }}
    >
      <Ionicons name="analytics-outline" size={33} color={theme.grayText} />
    </TouchableOpacity>
  );
}
