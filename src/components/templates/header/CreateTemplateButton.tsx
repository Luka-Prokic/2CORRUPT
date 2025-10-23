import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { useWorkoutStore } from "../../../stores/workout";

export function CreateTemplateButton() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();

  function handlePress() {
    router.back();
    router.back();
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="add-circle" size={44} color={theme.tint} />
    </TouchableOpacity>
  );
}
