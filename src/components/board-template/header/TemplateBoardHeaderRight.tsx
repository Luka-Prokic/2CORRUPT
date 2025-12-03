import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { useActionSheet } from "../../../utils/useActionSheet";
import { Fragment } from "react";

export function TemplateBoardHeaderRight() {
  const { theme } = useSettingsStore();
  const { activeTemplate, discardTemplate, confirmTemplate } =
    useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();
  const isItEmpty = !activeTemplate?.layout.length;

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
          router.back();
        }
      },
    });
  }

  function handleConfirmTemplate() {
    showActionSheet({
      title: `${t("workout-board.confirm-template")}?`,
      message: t("workout-board.confirm-template-message"),
      options: [
        t("workout-board.continue"),
        t("workout-board.confirm-template"),
      ],
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1) {
          confirmTemplate();
          setTypeOfView("home");
          router.back();
        }
      },
    });
  }

  return (
    <Fragment>
      <TouchableOpacity onPress={handleDiscardTemplate}>
        <Ionicons name="close-circle" size={44} color={theme.tint} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleConfirmTemplate} disabled={isItEmpty}>
        <Ionicons
          name="checkmark-circle"
          size={44}
          color={isItEmpty ? theme.handle : theme.text}
        />
      </TouchableOpacity>
    </Fragment>
  );
}
