import { View } from "react-native";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SessionExercise } from "../../../stores/workout/types";

export function TemplateProgressDots() {
  const { theme } = useSettingsStore();
  const { activeTemplate, activeExercise } = useWorkoutStore();

  if (!activeTemplate) return null;

  const flatItems = activeTemplate.layout;

  const getDotColor = (item: SessionExercise) => {
    if (item.id === activeExercise?.id) return theme.text;
    return theme.grayText;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {flatItems.length > 1 &&
        flatItems.map((item: SessionExercise, index: number) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: getDotColor(item),
            }}
          />
        ))}
    </View>
  );
}
