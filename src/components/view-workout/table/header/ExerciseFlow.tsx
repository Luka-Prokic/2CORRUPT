import { View } from "react-native";
import { IButton } from "../../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Text } from "react-native";
import { useWorkoutStore, Set } from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { SessionProgressDots } from "./SessionProgressDots";
import { useUIStore } from "../../../../stores/ui/useUIStore";
import { TemplateProgressDots } from "../../../view-template/header/TemplateProgressDots";

export function ExerciseFlow() {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();
  const { t } = useTranslation();

  const sets = activeExercise?.sets ?? [];
  const completedSets = sets.filter((s: Set) => s.isCompleted).length;
  const totalSets = sets.length;
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 44,
        gap: 8,
      }}
    >
      <TemplateProgressDots />
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
  );
}

export function LeftExerciseFlow() {
  const { theme } = useSettingsStore();
  const { isTherePrev, goToPreviousExercise } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();

  if (isTherePrev)
    return (
      <IButton
        style={{
          height: 44,
          width: 44,
        }}
        onPress={goToPreviousExercise}
      >
        <Ionicons name="chevron-back" size={34} color={theme.text} />
      </IButton>
    );

  return (
    <IButton
      onPress={() => {
        setTypeOfView("home");
      }}
    >
      <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
    </IButton>
  );
}

export function RightExerciseFlow() {
  const { theme } = useSettingsStore();
  const { isThereNext, goToNextExercise } = useWorkoutStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "session",
      },
    });
  }

  if (isThereNext)
    return (
      <IButton
        style={{
          height: 44,
          width: 44,
        }}
        onPress={goToNextExercise}
        disabled={!isThereNext}
      >
        <Ionicons name="chevron-forward" size={34} color={theme.text} />
      </IButton>
    );

  return (
    <IButton onPress={handlePress}>
      <Ionicons name="add-circle" size={44} color={theme.tint} />
    </IButton>
  );
}
