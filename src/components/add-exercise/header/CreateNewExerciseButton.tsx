import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";

export function CreateNewExerciseButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => {}} style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>Create</Text>
    </TouchableOpacity>
  );
}
