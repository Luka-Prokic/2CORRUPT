import { Text, View } from "react-native";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseName } from "../../../view-workout/table/header/ExerciseName";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { useTranslation } from "react-i18next";
import { RestCheatSheet } from "./RestCheatSheet";

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

      <View
        style={{
          width: WIDTH - 32,
          height: 68,
          paddingVertical: 2,
          flexDirection: "row",
          gap: 8,
          marginTop: 24,
        }}
      >
        {["-15", "+15"].map((label: string, index: number) => (
          <BounceButton
            key={index}
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
              backgroundColor: theme.handle,
              borderTopLeftRadius: index === 0 ? 32 : 8,
              borderBottomLeftRadius: index === 0 ? 32 : 8,
              borderTopRightRadius: index === 1 ? 32 : 8,
              borderBottomRightRadius: index === 1 ? 32 : 8,
              overflow: "hidden",
            }}
            onPress={() => handleChangeRestTime(label === "-15" ? -15 : 15)}
            disabled={restTime === 0 && label === "-15"}
          >
            <StrobeBlur
              colors={
                activeTemplate
                  ? [theme.text, theme.text, theme.text, theme.text]
                  : [
                      theme.caka,
                      theme.primaryBackground,
                      theme.accent,
                      theme.tint,
                    ]
              }
              tint="light"
              style={{
                width: WIDTH / 2 - 20,
                height: 64,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
              >
                {label}
              </Text>
            </StrobeBlur>
          </BounceButton>
        ))}
      </View>
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
