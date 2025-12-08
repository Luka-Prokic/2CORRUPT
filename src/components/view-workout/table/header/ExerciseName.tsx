import { Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { SessionExercise } from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";

interface ExerciseNameProps {
  exercise: SessionExercise;
  fontSize?: number;
  textColor?: string;
  prefixColor?: string;
}

export function ExerciseName({
  exercise,
  fontSize,
  textColor,
  prefixColor,
}: ExerciseNameProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

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
      {prefixColor ? (
        <Text style={{ color: prefixColor }}>{exercise.prefix} </Text>
      ) : (
        ""
      )}
      {exercise.name?.[t("locale")]}
    </Text>
  );
}
