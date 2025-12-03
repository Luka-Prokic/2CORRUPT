import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { WIDTH } from "../../../../features/Dimensions";
import { ViewStyle } from "react-native";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";

interface ExerciseListAddNewButtonProps {
  style?: ViewStyle | ViewStyle[];
}

export function ExerciseListAddNewButton({
  style,
}: ExerciseListAddNewButtonProps) {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: activeSession ? "session" : "template",
      },
    });
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        height: 64,
        width: WIDTH - 32,
        margin: 16,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.thirdBackground,
        ...style,
      }}
    >
      <Ionicons name="add" size={32} color={theme.border} />
    </StrobeButton>
  );
}
