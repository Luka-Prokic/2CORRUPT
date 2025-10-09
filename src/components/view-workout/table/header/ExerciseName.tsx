import { Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { SessionExercise } from "../../../../stores/workoutStore";
import { useTranslatedSessionExerciseName } from "../../../../features/workout/useTranslatedExercisesNames";

interface ExerciseNameProps {
  exercise: SessionExercise;
  fontSize?: number;
  textColor?: string;
}

export function ExerciseName({ exercise, fontSize, textColor }: ExerciseNameProps) {
  const { theme } = useSettingsStore();
  const { translatedName } = useTranslatedSessionExerciseName(exercise);

  return (
    <Text
      style={{
        fontSize: fontSize ?? 56,
        fontWeight: "bold",
        color: textColor ?? theme.text,
      }}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {exercise.prefix ? `${exercise.prefix} ` : ""}
      {translatedName}
    </Text>
  );
}
