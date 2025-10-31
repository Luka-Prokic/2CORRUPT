import { View, Text } from "react-native";
import { DropSet, SessionExercise, Set, useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../features/Dimensions";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { NumericDropInput } from "../../view-workout/table/set-inputs/NumericDropInput";

export function PreviewDropSetRow({
    exercise,
  set,
  drop,
  index,
}: {
    exercise:SessionExercise;
  set: Set;
  drop: DropSet;
  index: number;
}) {
  const { theme } = useSettingsStore();

  const columns = exercise?.columns ?? ["Reps", "Weight"];
  const columnWidth = WIDTH / (columns.length + 2);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: hexToRGBA(
          theme.fifthBackground,
          set.isCompleted ? 1 : 0.2
        ),
        height: 34,
        width: WIDTH,
      }}
    >
      <View
        style={{
          width: columnWidth,
          height: 34,
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
        disabled
      />

      <NumericDropInput
        set={set}
        drop={drop}
        column="Weight"
        style={{
          width: columnWidth,
        }}
        disabled
      />
    </View>
  );
}
