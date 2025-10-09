import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Set, useWorkoutStore } from "../../../../stores/workoutStore";
import { DropSet } from "../../../../stores/workoutStore";
import { Ionicons } from "@expo/vector-icons";

export function DropSetRow({
  set,
  drop,
  index,
}: {
  set: Set;
  drop: DropSet;
  index: number;
}) {
  const { theme } = useSettingsStore();
  const { updateDropSetInActiveExercise, removeDropSetFromActiveExercise } =
    useWorkoutStore();

  const handleDropUpdate = (dropId: string, update: any) => {
    updateDropSetInActiveExercise(set.id, dropId, update);
  };

  const handleRemoveDrop = (dropId: string) => {
    removeDropSetFromActiveExercise(set.id, dropId);
  };
  return (
    <View
      key={`${set.id}-${drop.id}-${index}`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: hexToRGBA(
          theme.fifthBackground,
          set.isCompleted ? 1 : 0.2
        ),
        height: 44,
      }}
    >
      <View
        style={{
          width: "25%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            width: 28,
            fontSize: 16,
            fontWeight: "700",
            color: set.isCompleted ? theme.secondaryText : theme.grayText,
            textAlign: "center",
          }}
        >
          {index + 1}'
        </Text>
      </View>

      <TextInput
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          color: set.isCompleted ? theme.secondaryText : theme.grayText,
          width: "25%",
        }}
        value={drop.reps?.toString() ?? ""}
        onChangeText={(text) => handleDropUpdate(drop.id, { reps: text })}
        placeholder="0"
        placeholderTextColor={theme.grayText}
        keyboardType="numeric"
      />

      <TextInput
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          color: set.isCompleted ? theme.secondaryText : theme.grayText,
          width: "25%",
        }}
        value={drop.weight?.toString() ?? ""}
        onChangeText={(text) => handleDropUpdate(drop.id, { weight: text })}
        placeholder="0"
        placeholderTextColor={theme.grayText}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={() => handleRemoveDrop(drop.id)}
        style={{
          width: "25%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name={set.isCompleted ? "remove-circle" : "remove-circle-outline"}
          size={22}
          color={set.isCompleted ? theme.error : theme.grayText}
        />
      </TouchableOpacity>
    </View>
  );
}
