import { OptionButton } from "../../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export function RemoveExerciseButton() {
  const { theme } = useSettingsStore();
  return (
    <OptionButton
      title="Remove Exercise"
      icon={<Ionicons name="remove-outline" size={24} color={theme.error} />}
      onPress={() => {}}
      color={theme.error}
    />
  );
}
