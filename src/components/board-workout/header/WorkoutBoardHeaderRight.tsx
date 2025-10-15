import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { useActionSheet } from "../../../features/useActionSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fragment } from "react";

export function WorkoutBoardHeaderRight() {
  const { theme } = useSettingsStore();
  const { activeSession, cancelSession, completeSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();
  const insets = useSafeAreaInsets();
  const isItEmpty = !activeSession?.layout.length;

  function handleCancelSession() {
    const options = [
      t("workout-board.continue"),
      t("workout-board.exit-workout"),
      !isItEmpty && t("workout-board.save-as-template"),
    ].filter(Boolean);

    showActionSheet({
      title: `${t("workout-board.exit-workout")}?`,
      message: t("workout-board.exit-workout-message"),
      options,
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1 || (buttonIndex === 2 && !isItEmpty)) {
          setTypeOfView("home");
          cancelSession();
          router.back();
        }
      },
    });
  }

  function handleCompleteSession() {
    showActionSheet({
      title: `${t("workout-board.complete-workout")}?`,
      message: t("workout-board.complete-workout-message"),
      options: [
        t("workout-board.continue"),
        t("workout-board.complete-workout"),
      ],
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1) {
          completeSession();
          setTypeOfView("home");
          router.back();
        }
      },
    });
  }

  return (
    <Fragment>
      <TouchableOpacity onPress={handleCancelSession}>
        <Ionicons name="close-circle" size={44} color={theme.error} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCompleteSession} disabled={isItEmpty}>
        <Ionicons
          name="checkmark-circle"
          size={44}
          color={isItEmpty ? theme.handle : theme.text}
        />
      </TouchableOpacity>
    </Fragment>
  );
}
