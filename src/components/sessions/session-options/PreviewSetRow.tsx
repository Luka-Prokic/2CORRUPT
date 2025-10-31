import React from "react";
import { View } from "react-native";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { WIDTH } from "../../../features/Dimensions";
import { useSettingsStore } from "../../../stores/settings";
import { DropSet, SessionExercise, Set } from "../../../stores/workout/types";
import { SetColumns } from "../../view-workout/table/set-row/SetRow";
import { SetIndex } from "../../view-workout/table/set-inputs/SetIndex";
import { DoneInput } from "../../view-workout/table/set-inputs/DoneInput";
import { NumericInput } from "../../view-workout/table/set-inputs/NumericInput";
import { InputRPE } from "../../view-workout/table/set-inputs/InputRPE";
import { InputRIR } from "../../view-workout/table/set-inputs/InputRIR";
import { PreviewDropSetRow } from "./PreviewDropSetRow";

interface PreviewSetRowProps {
  set: Set;
  setIndex: number;
  columns?: string[]; // optional override for columns to display
  execise: SessionExercise;
  width?: number;
  disabledStrobe?: boolean;
}

export function PreviewSetRow({
  set,
  setIndex,
  execise,
  width = WIDTH,
  disabledStrobe,
}: PreviewSetRowProps) {
  const { theme } = useSettingsStore();
  const exerciseColumns = execise?.columns || ["Reps", "Weight"];
  const columns = ["Set", ...exerciseColumns, "Done"];
  const height = set.dropSets?.length ? 54 + set.dropSets?.length * 34 : 54;

  function input(column: SetColumns) {
    if (column === "Set") {
      return <SetIndex setIndex={setIndex} />;
    }
    if (column === "Done") {
      return <DoneInput set={set} disabled />;
    }
    if (column === "Reps" || column === "Weight") {
      return <NumericInput set={set} column={column} disabled />;
    }
    if (column === "RPE") {
      return <InputRPE set={set} disabled />;
    }
    if (column === "RIR") {
      return <InputRIR set={set} disabled />;
    }
  }
  return (
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
      style={{ width, height }}
      disabled={disabledStrobe}
    >
      <View style={{ flexDirection: "row", height: 54 }}>
        {columns.map((column: SetColumns, index: number) => (
          <View
            key={`${column}-${index}-${execise.exerciseInfoId}`}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: width / columns.length,
            }}
          >
            {input(column)}
          </View>
        ))}
      </View>

      {/* Drop Sets */}
      {set.dropSets?.length > 0 &&
        set.dropSets.map((drop: DropSet, index: number) => (
          <PreviewDropSetRow
            key={`${drop.id}-${index}-${setIndex}`}
            exercise={execise}
            set={set}
            drop={drop}
            index={index}
          />
        ))}
    </StrobeBlur>
  );
}
