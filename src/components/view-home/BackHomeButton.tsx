import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUIStore } from "../../stores/ui";

export function BackHomeButton() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();

  function handlePress() {
    setTypeOfView("home");
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
    </TouchableOpacity>
  );
}
