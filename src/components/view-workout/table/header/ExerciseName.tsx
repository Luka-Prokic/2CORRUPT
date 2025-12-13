import { Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  SessionExercise,
  useWorkoutStore,
} from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";

interface ExerciseNameProps {
  exercise?: SessionExercise;
  fontSize?: number;
  textColor?: string;
  prefixColor?: string;
  width?: number;
}

export function ExerciseName({
  exercise,
  fontSize,
  textColor,
  prefixColor,
  width,
}: ExerciseNameProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeExercise } = useWorkoutStore();

  const exerciseName =
    exercise?.name?.[t("locale")] || activeExercise?.name?.[t("locale")];

  const exercisePrefix = exercise?.prefix || activeExercise?.prefix;

  return (
    <Text
      style={{
        fontSize: fontSize ?? 56,
        fontWeight: "bold",
        color: textColor ?? theme.text,
        textAlign: "center",
        width: width ?? "100%",
      }}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {prefixColor ? (
        <Text style={{ color: prefixColor }}>{exercisePrefix} </Text>
      ) : (
        ""
      )}
      {exerciseName}
    </Text>
  );
}
