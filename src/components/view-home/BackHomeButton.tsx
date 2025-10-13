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
    <TouchableOpacity
      onPress={handlePress}
      style={{ padding: 10, position: "absolute", left: 10, top: 10 }}
    >
      <Ionicons name="chevron-back-circle" size={44} color={theme.grayText} />
    </TouchableOpacity>
  );
}
