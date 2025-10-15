import { View, Pressable } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";

interface SheetHeaderProps {
  listOpen: boolean;
  togglePanel: () => void;
}

export function SheetHeader({ listOpen, togglePanel }: SheetHeaderProps) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();

  const isDisabled = !activeExercise && !listOpen;

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
        disabled={isDisabled}
      >
        <Ionicons
          name={listOpen ? "chevron-down" : "chevron-up"}
          size={34}
          color={isDisabled ? theme.handle : theme.text}
        />
      </Pressable>
    </View>
  );
}
