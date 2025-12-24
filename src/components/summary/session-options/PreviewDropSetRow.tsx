import { View, Text } from "react-native";
import { DropSet, SessionExercise, Set } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../utils/Dimensions";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { NumericDropInput } from "../../view-workout/table/set-inputs/NumericDropInput";

interface PreviewDropSetRowProps {
  exercise: SessionExercise;
  set: Set;
  drop: DropSet;
  index: number;
  width?: number;
}

export function PreviewDropSetRow({
  exercise,
  set,
  drop,
  index,
  width = WIDTH,
}: PreviewDropSetRowProps) {
  const { theme } = useSettingsStore();

  const columns = exercise?.columns ?? ["Reps", "Weight"];
  const columnWidth = width / (columns.length + 2);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: hexToRGBA(
          theme.fifthBackground,
          set.isCompleted ? 1 : 0.2
        ),
        height: 34,
        width: width,
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
          height: 34,
        }}
        disabled
      />

      <NumericDropInput
        set={set}
        drop={drop}
        column="Weight"
        style={{
          width: columnWidth,
          height: 34,
        }}
        disabled
      />
    </View>
  );
}
