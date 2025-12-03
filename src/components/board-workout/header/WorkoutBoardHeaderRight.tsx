import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { useActionSheet } from "../../../utils/useActionSheet";
import { Fragment } from "react";

export function WorkoutBoardHeaderRight() {
  const { theme } = useSettingsStore();
  const {
    activeSession,
    cancelSession,
    completeSession,
    editTemplate,
    updateTemplateField,
    confirmTemplate,
  } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();
  const isItEmpty = !activeSession?.layout.length;

  const handlePullTemplate = () => {
    const templateId = editTemplate();

    const newLayout = activeSession.layout.map((ex) => ({
      ...ex,
      sets: ex.sets.map((set) => ({
        ...set,
        isCompleted: false,
      })),
    }));

    updateTemplateField(templateId, "layout", newLayout);
    updateTemplateField(templateId, "name", activeSession.name);
    updateTemplateField(templateId, "description", activeSession.notes);
    confirmTemplate();
  };

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
        if (buttonIndex === 2 && !isItEmpty) {
          setTypeOfView("home");
          router.push("/home-board");
          handlePullTemplate();
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
