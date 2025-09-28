import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeContext";
import { useNavigation } from "@react-navigation/native";

interface ProfileButtonProps {
  onPress?: () => void;
}

export default function ProfileButton({ onPress }: ProfileButtonProps) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Profile" as never);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        paddingHorizontal: 10,
      }}
    >
      <Ionicons name="person-circle-outline" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}
