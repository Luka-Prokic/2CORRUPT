import { View } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui/useUIStore";
import { TemplateProgressDots } from "./TemplateProgressDots";
import { useActionSheet } from "../../../features/useActionSheet";

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
  const { isTherePrev, goToPreviousExercise, discardTemplate } =
    useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();

  function handleDiscardTemplate() {
    const options = [
      t("workout-board.continue"),
      t("workout-board.discard-template"),
    ].filter(Boolean);
    showActionSheet({
      title: `${t("workout-board.discard-template")}?`,
      message: t("workout-board.discard-template-message"),
      options,
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1) {
          setTypeOfView("home");
          discardTemplate();
        }
      },
    });
  }

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
    <IButton onPress={handleDiscardTemplate}>
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
