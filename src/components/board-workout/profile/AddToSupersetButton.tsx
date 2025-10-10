import { OptionButton } from "../../ui/buttons/OptionButton";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";

export function AddToSupersetButton() {
  const { theme } = useSettingsStore();
  return (
    <OptionButton
      title="Add to Superset"
      icon={<Ionicons name="add-outline" size={24} color={theme.text} />}
      onPress={() => {}}
    />
  );
}
