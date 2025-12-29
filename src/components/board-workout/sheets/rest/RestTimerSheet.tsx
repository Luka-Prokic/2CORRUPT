import { View } from "react-native";
import { HEIGHT, WIDTH } from "../../../../utils/Dimensions";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseName } from "../../../view-workout/table/header/ExerciseName";
import { useTranslation } from "react-i18next";
import { TwoOptionStrobeButtons } from "../../../ui/buttons/TwoOptionStrobeButtons";
import { MidText } from "../../../ui/text/MidText";
import { DescriptionText } from "../../../ui/text/DescriptionText";
import { useFormatTime } from "../../../../features/format/useFormatTime";
import { IText } from "../../../ui/text/IText";
import { CheatSheet } from "../../../ui/CheatSheet";

export function RestTimerSheet() {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise, activeTemplate } =
    useWorkoutStore();
  const { defaultRestTime } = useSettingsStore();
  const { t } = useTranslation();

  const restTime = activeExercise?.restTime ?? defaultRestTime ?? 180;

  const formattedTime = useFormatTime({ seconds: restTime, format: "auto+" });

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
      <MidText
        style={{ color: theme.grayText }}
        text={t("workout-board.rest-time")}
      />

      <IText text={formattedTime} size={52} />

      <TwoOptionStrobeButtons
        haptics
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

      <DescriptionText
        style={{
          textAlign: "justify",
          marginVertical: 8,
          color: theme.grayText,
        }}
        text={t("workout-board.rest-timer-description")}
      />

      <CheatSheet
        title={t("workout-board.typical-rest-times")}
        items={[
          t("workout-board.heavy-lifts"),
          t("workout-board.compound-lifts"),
          t("workout-board.accessory-lifts"),
          t("workout-board.accessory-lifts-supersets"),
          t("workout-board.cardio-or-warm-up-sets"),
        ]}
        useBullets
      />
    </View>
  );
}
