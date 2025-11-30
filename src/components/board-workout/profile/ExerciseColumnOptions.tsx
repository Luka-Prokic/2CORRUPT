import { OptionButton } from "../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import { StrobeOptionButton } from "../../ui/buttons/StrobeOptionButton";

export function ExerciseColumnOptions() {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise, activeTemplate } =
    useWorkoutStore();
  const { t } = useTranslation();

  const showEnabledRPE = activeExercise?.columns.includes("RPE");
  const showEnabledRIR = activeExercise?.columns.includes("RIR");

  const [showRPE, setShowRPE] = useState(showEnabledRPE);
  const [showRIR, setShowRIR] = useState(showEnabledRIR);

  const handleToggleColumn = (column: "RPE" | "RIR") => {
    if (!activeExercise) return;

    const newColumns = activeExercise.columns.includes(column)
      ? activeExercise.columns.filter((c) => c !== column)
      : [...activeExercise.columns, column];

    updateActiveExercise({ columns: newColumns });
  };

  const accent = activeTemplate ? theme.tint : theme.accent;

  return (
    <Fragment>
      <StrobeOptionButton
        title={t(`dialog.${showRPE ? "hide" : "show"}`) + " RPE"}
        icon={
          <Ionicons
            name={showRPE ? "eye" : "eye-off"}
            size={24}
            color={showRPE ? accent : theme.grayText}
          />
        }
        height={44}
        onPress={() => {
          setShowRPE(!showRPE);
          handleToggleColumn("RPE");
        }}
        color={showRPE ? accent : theme.grayText}
        strobeDisabled={!showRPE}
        justifyContent="space-between"
      />
      <StrobeOptionButton
        title={t(`dialog.${showRIR ? "hide" : "show"}`) + " RIR"}
        icon={
          <Ionicons
            name={showRIR ? "eye" : "eye-off"}
            size={24}
            color={showRIR ? accent : theme.grayText}
          />
        }
        height={44}
        onPress={() => {
          setShowRIR(!showRIR);
          handleToggleColumn("RIR");
        }}
        color={showRIR ? accent : theme.grayText}
        strobeDisabled={!showRIR}
        justifyContent="space-between"
      />
    </Fragment>
  );
}
