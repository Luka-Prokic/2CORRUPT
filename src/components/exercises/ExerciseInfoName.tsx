import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";

interface ExerciseNameProps {
  exercise: ExerciseInfo;
  fontSize?: number;
  textColor?: string;
  prefixColor?: string;
}

export function ExerciseInfoName({
  exercise,
  fontSize,
  textColor,
  prefixColor,
}: ExerciseNameProps) {
  const { theme } = useSettingsStore();

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
      <Text style={{ color: prefixColor }}>{exercise?.defaultName || "Exercise"} </Text>
    </Text>
  );
}
