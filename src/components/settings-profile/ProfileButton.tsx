import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { BounceButton } from "../ui/buttons/BounceButton";

interface ProfileButtonProps {
  onPress?: () => void;
}

export function ProfileButton({ onPress }: ProfileButtonProps) {
  const { theme } = useSettingsStore();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/profile");
    }
  };

  return (
    <BounceButton
      onPress={handlePress}
      style={{
        width: 88,
        height: 88,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Glow circle BEHIND icon */}
      <View
        style={{
          position: "absolute",
          height: 74,
          width: 74,
          top: 12,
          left: 12,
          borderRadius: "50%",
          backgroundColor: theme.glow,
        }}
      />

      {/* Icon ABOVE glow */}
      <Ionicons
        name="person-circle"
        size={94}
        color={theme.grayText}
        style={{ position: "relative", top: 1, left: 2 }}
      />
    </BounceButton>
  );
}
