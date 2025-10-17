import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { Set } from "../../../../stores/workout/types";

interface DoneInputProps {
  set: Set;
}

export function DoneInput({ set }: DoneInputProps) {
  const { theme } = useSettingsStore();
  const { updateSetInActiveExercise, activeTemplate } = useWorkoutStore();

  const handleToggleComplete = () => {
    updateSetInActiveExercise(set.id, { isCompleted: !set.isCompleted });
  };
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
      }}
      onPress={handleToggleComplete}
      disabled={set.isCompleted || !!activeTemplate}
    >
      <Ionicons
        name={set.isCompleted ? "checkmark-circle" : "ellipse-outline"}
        size={44}
        color={
          set.isCompleted
            ? theme.text
            : activeTemplate
            ? theme.handle
            : theme.grayText
        }
      />
    </TouchableOpacity>
  );
}
