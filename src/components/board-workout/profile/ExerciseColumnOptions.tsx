import { OptionButton } from "../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useTranslation } from "react-i18next";

export function ExerciseColumnOptions() {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise } = useWorkoutStore();
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

  return (
    <Fragment>
      <OptionButton
        title={t(`dialog.${showRPE ? "hide" : "show"}`) + " RPE"}
        icon={
          <Ionicons
            name={showRPE ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={showRPE ? theme.accent : theme.grayText}
          />
        }
        height={44}
        onPress={() => {
          setShowRPE(!showRPE);
          handleToggleColumn("RPE");
        }}
        color={showRPE ? theme.accent : theme.grayText}
      />
      <OptionButton
        title={t(`dialog.${showRIR ? "hide" : "show"}`) + " RIR"}
        icon={
          <Ionicons
            name={showRIR ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={showRIR ? theme.accent : theme.grayText}
          />
        }
        height={44}
        onPress={() => {
          setShowRIR(!showRIR);
          handleToggleColumn("RIR");
        }}
        color={showRIR ? theme.accent : theme.grayText}
      />
    </Fragment>
  );
}
