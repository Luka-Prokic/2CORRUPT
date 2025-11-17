import { Text, View } from "react-native";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseName } from "../../../view-workout/table/header/ExerciseName";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { useTranslation } from "react-i18next";
import { RestCheatSheet } from "./RestCheatSheet";
import { TwoOptionStrobeButtons } from "../../../ui/buttons/TwoOptionStrobeButtons";

export function RestTimerSheet() {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise, activeTemplate } =
    useWorkoutStore();
  const { t } = useTranslation();

  const restTime = activeExercise?.restTime ?? 180;

  const minutes = String(Math.floor(restTime / 60));
  const seconds = String(restTime % 60).padStart(2, "0");

  function handleChangeRestTime(value: number) {
    updateActiveExercise({ restTime: restTime + value });
  }
  return (
    <View
      style={{
        width: WIDTH,
        height: HEIGHT - 200,
        paddingHorizontal: 16,
        paddingTop: 34,
        gap: 8,
        alignItems: "center",
      }}
    >
      <ExerciseName
        exercise={activeExercise}
        textColor={activeTemplate ? theme.tint : theme.accent}
      />
      <Text style={{ fontSize: 18, color: theme.grayText }}>
        {t("workout-board.rest-time")}
      </Text>

      <Text style={{ fontSize: 52, fontWeight: "bold", color: theme.text }}>
        {minutes}min {seconds}s
      </Text>

      <TwoOptionStrobeButtons
        labelOne="-15"
        labelTwo="+15"
        onOptionOne={() => handleChangeRestTime(-15)}
        onOptionTwo={() => handleChangeRestTime(15)}
        styleOne={{
          backgroundColor: activeTemplate ? theme.tint : theme.handle,
        }}
        styleTwo={{
          backgroundColor: activeTemplate ? theme.tint : theme.handle,
        }}
        disabledOne={restTime === 0}
      />

      <Text
        style={{
          fontSize: 14,
          color: theme.grayText,
          textAlign: "justify",
          marginBottom: 16,
        }}
      >
        {t("workout-board.rest-timer-description")}
      </Text>

      <RestCheatSheet />
    </View>
  );
}
