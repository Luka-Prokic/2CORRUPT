import { OptionButton } from "../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export function SwapExerciseButton() {
  const { theme } = useSettingsStore();

  return (
    <OptionButton
      title="Swap Exercise"
      icon={
        <Ionicons name="swap-vertical-outline" size={24} color={theme.text} />
      }
      onPress={() => {}}
    />
  );
}
