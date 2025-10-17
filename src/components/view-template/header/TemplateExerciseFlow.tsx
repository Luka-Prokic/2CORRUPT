import { View } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui/useUIStore";
import { TemplateProgressDots } from "./TemplateProgressDots";

export function TemplateExerciseFlow() {
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
    </View>
  );
}

export function LeftTemplateExerciseFlow() {
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

export function RightTemplateExerciseFlow() {
  const { theme } = useSettingsStore();
  const { isThereNext, goToNextExercise } = useWorkoutStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "template",
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
      <Ionicons name="add-circle" size={44} color={theme.grayText} />
    </IButton>
  );
}
