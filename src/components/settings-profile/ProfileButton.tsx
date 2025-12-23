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
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
      }}
      haptics
    >
      {/* Glow circle BEHIND icon */}
      <View
        style={{
          position: "absolute",
          height: 50,
          width: 50,
          top: 8,
          left: 7,
          borderRadius: "50%",
          backgroundColor: theme.glow,
        }}
      />

      {/* Icon ABOVE glow */}
      <Ionicons name="person-circle" size={64} color={theme.grayText} />
    </BounceButton>
  );
}
