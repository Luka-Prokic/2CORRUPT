import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkoutStore } from "../../stores/workoutStore";
import { useUIStore } from "../../stores/ui";
import { router } from "expo-router";

interface WorkoutBoardHeaderProps {
  listOpen: boolean;
}
export function WorkoutBoardHeader({ listOpen }: WorkoutBoardHeaderProps) {
  const { theme } = useSettingsStore();
  const { activeSession, cancelSession, completeSession } = useWorkoutStore();
  const { setWorkoutView } = useUIStore();

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
      <TouchableOpacity
        onPress={() => {
          cancelSession();
          setWorkoutView(false);
          router.back();
        }}
      >
        <Ionicons name="close-circle" size={44} color={theme.error} />
      </TouchableOpacity>
      <Text
        style={{
          color: listOpen ? theme.glow : theme.grayText,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {activeSession.name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          completeSession();
          setWorkoutView(false);
          router.back();
        }}
      >
        <Ionicons name="checkmark-circle" size={44} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}
