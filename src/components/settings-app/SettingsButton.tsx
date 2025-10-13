import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { BounceButton } from "../ui/buttons/BounceButton";
import { router } from "expo-router";

interface SettingsButtonProps {
  onPress?: () => void;
}

export function SettingsButton({ onPress }: SettingsButtonProps) {
  const { theme } = useSettingsStore();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/settings");
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
