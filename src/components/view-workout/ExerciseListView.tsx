import { Fragment } from "react";
import { ExerciseTableHeader } from "./table/ExerciseTableHeader";
import { ExerciseSetList } from "./table/ExerciseSetList";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { AddSetButton } from "./table/AddSetButton";
import { useSettingsStore } from "../../stores/settingsStore";

export function ExerciseListView() {
  const { theme } = useSettingsStore();

  return (
    <Fragment>
      {/* Header */}
      <ExerciseTableHeader />

      {/* Sets Table */}
      <ExerciseSetList />

      {/* Add Set Button */}
      <LinearGradient
        style={{
          padding: 16,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        colors={[theme.background, hexToRGBA(theme.background, 0)]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <AddSetButton />
      </LinearGradient>
    </Fragment>
  );
}
