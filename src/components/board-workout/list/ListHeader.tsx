import { View, Pressable } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";

interface ListHeaderProps {
  listOpen: boolean;
  togglePanel: () => void;
}

export function ListHeader({ listOpen, togglePanel }: ListHeaderProps) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();

  return (
    <View
      style={{
        position: "absolute",
        height: 88,
        padding: 10,
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: "row",
        backgroundColor: theme.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <Pressable
        onPress={togglePanel}
        style={{
          flex: 1,
          alignItems: "center",
        }}
        disabled={!listOpen || !activeExercise}
      >
        <Ionicons
          name={listOpen ? "chevron-down" : "chevron-up"}
          size={34}
          color={!listOpen || !activeExercise ? theme.grayText : theme.text}
        />
      </Pressable>
    </View>
  );
}
