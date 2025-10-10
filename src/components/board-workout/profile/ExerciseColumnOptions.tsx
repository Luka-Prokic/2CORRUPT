import { OptionButton } from "../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useState } from "react";

export function ExerciseColumnOptions() {
  const { theme } = useSettingsStore();
  const [showRPE, setShowRPE] = useState(false);
  const [showRIR, setShowRIR] = useState(false);

  return (
    <Fragment>
      <OptionButton
        title={showRPE ? "Hide RPE" : "Show RPE"}
        icon={
          <Ionicons
            name={showRPE ? "eye" : "eye-off"}
            size={24}
            color={showRPE ? theme.accent : theme.grayText}
          />
        }
        onPress={() => {
          setShowRPE(!showRPE);
        }}
        color={showRPE ? theme.accent : theme.grayText}
      />
      <OptionButton
        title={showRIR ? "Hide RIR" : "Show RIR"}
        icon={
          <Ionicons
            name={showRIR ? "eye" : "eye-off"}
            size={24}
            color={showRIR ? theme.accent : theme.grayText}
          />
        }
        onPress={() => {
          setShowRIR(!showRIR);
        }}
        color={showRIR ? theme.accent : theme.grayText}
      />
    </Fragment>
  );
}
