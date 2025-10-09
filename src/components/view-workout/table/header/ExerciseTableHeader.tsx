import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { ExerciseFlow } from "./ExerciseFlow";
import { SetTableHeader } from "./SetTableHeader";
import { WIDTH } from "../../../../features/Dimensions";
import { SessionExerciseNameSlider } from "./SessionExerciseNameSlider";

export function ExerciseTableHeader() {
  const { theme } = useSettingsStore();

  return (
    <StrobeBlur
      colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
      tint="auto"
      style={{
        backgroundColor: theme.background,
        height: 188,
        width: WIDTH,
      }}
    >
      <LinearGradient
        colors={[
          theme.background,
          hexToRGBA(theme.background, 0),
          hexToRGBA(theme.background, 0),
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          height: 188,
          width: WIDTH,
          alignItems: "center",
        }}
      >
        <ExerciseFlow />

        <SessionExerciseNameSlider />

        <SetTableHeader />
      </LinearGradient>
    </StrobeBlur>
  );
}
