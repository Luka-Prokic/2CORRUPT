import { View } from "react-native";
import { IButton } from "../../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Text } from "react-native";
import { useWorkoutStore, Set } from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { SessionProgressDots } from "./SessionProgressDots";
import { WIDTH } from "../../../../features/Dimensions";
import { useUIStore } from "../../../../stores/ui/useUIStore";

export function ExerciseFlow() {
  const { theme } = useSettingsStore();
  const {
    isTherePrev,
    isThereNext,
    goToPreviousExercise,
    goToNextExercise,
    activeExercise,
  } = useWorkoutStore();
  const { t } = useTranslation();
  const { setTypeOfView } = useUIStore();

  const sets = activeExercise?.sets ?? [];
  const completedSets = sets.filter((s: Set) => s.isCompleted).length;
  const totalSets = sets.length;
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        height: 88,
      }}
    >
      {isTherePrev ? (
        <IButton
          style={{
            width: 54,
            height: 54,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={goToPreviousExercise}
        >
          <Ionicons name="chevron-back" size={34} color={theme.text} />
        </IButton>
      ) : (
        <IButton
          style={{
            width: 54,
            height: 54,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setTypeOfView("home");
          }}
        >
          <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
        </IButton>
      )}

      <View
        style={{
          height: 88,
          width: WIDTH - 108,
          alignItems: "center",
        }}
      >
        <SessionProgressDots />
        <Text
          style={{
            fontSize: 16,
            opacity: 0.7,
            color:
              completedSets === totalSets && completedSets !== 0
                ? theme.tint
                : theme.grayText,
          }}
        >
          {t("workout-view.sets-completed", {
            count: completedSets,
            total: totalSets,
          })}
        </Text>
      </View>

      {isThereNext ? (
        <IButton
          style={{
            width: 54,
            height: 54,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={goToNextExercise}
          disabled={!isThereNext}
        >
          <Ionicons name="chevron-forward" size={34} color={theme.text} />
        </IButton>
      ) : (
        <IButton
          style={{
            width: 54,
            height: 54,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.push("/add-exercise")}
        >
          <Ionicons name="add-circle" size={44} color={theme.text} />
        </IButton>
      )}
    </View>
  );
}
