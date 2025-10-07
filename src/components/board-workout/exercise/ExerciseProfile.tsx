import { useFadeInAnim } from "../../../animations/useFadeInAnim";
import { WIDTH } from "../../../features/Dimensions";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { SessionExercise } from "../../../stores/workout/types";
import { Animated, Text } from "react-native";

export function ExerciseProfile({ exercise }: { exercise: SessionExercise }) {
  const { theme } = useSettingsStore();
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{ flex: 1, width: WIDTH, paddingHorizontal: 16, ...fadeIn }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", color: theme.text }}>
        {exercise.name}
      </Text>
      {exercise.notes && (
        <Text style={{ fontSize: 16, color: theme.grayText }}>
          {exercise.notes}
        </Text>
      )}
    </Animated.View>
  );
}
