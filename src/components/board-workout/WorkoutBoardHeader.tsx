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
  const { setWorkoutView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();

  const handleCancelSession = () => {
    showActionSheet({
      title: `${t("workout-board.exit-workout")}?`,
      message: t("workout-board.exit-workout-message"),
      options: [
        t("workout-board.continue"),
        t("workout-board.exit-workout"),
        t("workout-board.save-as-template"),
      ],
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1 || buttonIndex === 2) {
          setWorkoutView(false);
          cancelSession();
          router.back();
        }
      },
    });
  };

  const handleCompleteSession = () => {
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
          setWorkoutView(false);
          router.back();
        }
      },
    });
  };

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
      <TouchableOpacity onPress={handleCancelSession}>
        <Ionicons name="close-circle" size={44} color={theme.error} />
      </TouchableOpacity>
      <Text
        style={{
          color: listOpen ? theme.glow : theme.grayText,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {activeSession.name || t("workout-board.workout")}
      </Text>
      <TouchableOpacity onPress={handleCompleteSession}>
        <Ionicons name="checkmark-circle" size={44} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}
