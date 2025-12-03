import { View, Text, TouchableOpacity } from "react-native";
import { hexToRGBA } from "../../../../utils/HEXtoRGB";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Set, useWorkoutStore } from "../../../../stores/workoutStore";
import { DropSet } from "../../../../stores/workoutStore";
import { Ionicons } from "@expo/vector-icons";
import { WIDTH } from "../../../../utils/Dimensions";
import { NumericDropInput } from "../set-inputs/NumericDropInput";
import * as Haptics from "expo-haptics";

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
  const { removeDropSetFromActiveExercise, activeExercise } = useWorkoutStore();

  const handleRemoveDrop = (dropId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    removeDropSetFromActiveExercise(set.id, dropId);
  };

  const columns = activeExercise?.columns ?? ["Reps", "Weight"];
  const columnWidth = WIDTH / (columns.length + 2);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: hexToRGBA(
          theme.fifthBackground,
          set.isCompleted ? 1 : 0.2
        ),
        height: 44,
        width: WIDTH,
      }}
    >
      <View
        style={{
          width: columnWidth,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: set.isCompleted ? theme.secondaryText : theme.grayText,
            textAlign: "center",
          }}
        >
          {index + 1}'
        </Text>
      </View>

      <NumericDropInput
        set={set}
        drop={drop}
        column="Reps"
        style={{
          width: columnWidth,
        }}
      />

      <NumericDropInput
        set={set}
        drop={drop}
        column="Weight"
        style={{
          width: columnWidth,
        }}
      />
      <TouchableOpacity
        onPress={() => handleRemoveDrop(drop.id)}
        style={{
          width: columnWidth,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 0,
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
