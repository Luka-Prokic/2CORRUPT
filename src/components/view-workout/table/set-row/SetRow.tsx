import { useRef } from "react";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Swipeable } from "react-native-gesture-handler";
import { SetIndex } from "../set-inputs/SetIndex";
import { DoneInput } from "../set-inputs/DoneInput";
import {
  ExerciseColumns,
  DropSet,
  Set,
} from "../../../../stores/workout/types";
import { View } from "react-native";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { SetSwipeActions } from "./SetSwipeActions";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { WIDTH } from "../../../../features/Dimensions";
import { DropSetRow } from "./DropSetRow";
import { NumericInput } from "../set-inputs/NumericInput";

export type SetColumns = ExerciseColumns | "Set" | "Done";
interface SetRowProps {
  set: Set;
  setIndex: number;
}

export function SetRow({ set, setIndex }: SetRowProps) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();
  const swipeableRef = useRef<Swipeable>(null);

  const exerciseColumns = activeExercise?.columns || ["Reps", "Weight"];
  const columns = ["Set", ...exerciseColumns, "Done"];

  function input(column: SetColumns) {
    if (column === "Set") {
      return (
        <SetIndex
          setIndex={setIndex}
        />
      );
    }
    if (column === "Done") {
      return (
        <DoneInput
          set={set}
        />
      );
    }
    if (column === "Reps" || column === "Weight") {
      return (
        <NumericInput
          set={set}
          column={column}
        />
      );
    }
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <SetSwipeActions set={set} swipeableRef={swipeableRef} />
      )}
    >
      {/* Main Set Row */}
      <StrobeBlur
        colors={
          set.isCompleted
            ? [theme.text, theme.caka, theme.accent, theme.tint]
            : [
                theme.secondaryBackground,
                theme.border,
                theme.grayText,
                theme.handle,
              ]
        }
        tint={set.isCompleted ? "light" : "auto"}
        style={{ width: WIDTH, height: 66 }}
      >
        <View style={{ flexDirection: "row", width: WIDTH, height: 66 }}>
          {columns.map((column: SetColumns, index: number) => (
            <View
              key={`${column}-${index}`}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: WIDTH / columns.length,
              }}
            >
              {input(column)}
            </View>
          ))}
        </View>
      </StrobeBlur>

      {/* Drop Sets */}
      {set.dropSets?.length > 0 &&
        set.dropSets.map((drop: DropSet, index: number) => (
          <DropSetRow
            key={`${drop.id}-${index}-${setIndex}`}
            set={set}
            drop={drop}
            index={index}
          />
        ))}
    </Swipeable>
  );
}
