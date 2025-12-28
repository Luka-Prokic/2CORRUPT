import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { useTranslation } from "react-i18next";

interface ExerciseNameProps {
  exercise: ExerciseInfo;
  fontSize?: number;
  textColor?: string;
}

export function ExerciseInfoName({
  exercise,
  fontSize,
  textColor,
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
      {exercise?.defaultName?.[t("locale")] || "Exercise"}
    </Text>
  );
}
