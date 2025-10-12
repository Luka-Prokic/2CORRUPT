import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkoutStore } from "../../stores/workoutStore";
import { useUIStore } from "../../stores/ui";
import { router } from "expo-router";
import { useActionSheet } from "../../features/useActionSheet";

interface WorkoutBoardHeaderProps {
  listOpen: boolean;
}
export function WorkoutBoardHeader({ listOpen }: WorkoutBoardHeaderProps) {
  const { theme } = useSettingsStore();
  const { activeSession, cancelSession, completeSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();

  const isItEmpty = !activeSession?.layout.length;

  function handleCancelSession() {
    showActionSheet({
      title: `${t("workout-board.exit-workout")}?`,
      message: t("workout-board.exit-workout-message"),
      options: [
        t("workout-board.continue"),
        t("workout-board.exit-workout"),
        !isItEmpty && t("workout-board.save-as-template"),
      ],
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

  function handleGoBack() {
    setTypeOfView("home");
    router.back();
  }

  function rightHeader() {
    if (isItEmpty)
      return (
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-undo-circle" size={44} color={theme.text} />
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity onPress={handleCancelSession}>
        <Ionicons name="close-circle" size={44} color={theme.error} />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        zIndex: 1,
      }}
    >
      {rightHeader()}
      <Text
        style={{
          color: listOpen ? theme.glow : theme.grayText,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {activeSession?.name || t("workout-board.workout")}
      </Text>
      <TouchableOpacity onPress={handleCompleteSession} disabled={isItEmpty}>
        <Ionicons
          name="checkmark-circle"
          size={44}
          color={isItEmpty ? theme.grayText : theme.text}
        />
      </TouchableOpacity>
    </View>
  );
}
