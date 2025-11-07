import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { SetTableHeader } from "./SetTableHeader";
import { WIDTH } from "../../../../features/Dimensions";
import { SessionExerciseNameSlider } from "./SessionExerciseNameSlider";
import { TemplateExerciseNameSlider } from "../../../view-template/header/TemplateExerciseNameSlider";
import { useWorkoutStore } from "../../../../stores/workout";

export const EXERCISE_TABLE_HEADER_HEIGHT = 188;

export function ExerciseTableHeader() {
  const { theme } = useSettingsStore();
  const { activeTemplate } = useWorkoutStore();

  const lightText = hexToRGBA(theme.text, 0.2);

  return (
    <StrobeBlur
      colors={
        activeTemplate
          ? [theme.tint, theme.tint, theme.tint, theme.tint]
          : [lightText, lightText, lightText, lightText]
      }
      tint="auto"
      size={WIDTH}
      style={{
        backgroundColor: theme.background,
        height: EXERCISE_TABLE_HEADER_HEIGHT,
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
          height: EXERCISE_TABLE_HEADER_HEIGHT,
          width: WIDTH,
        }}
      >
        <SessionExerciseNameSlider />
        <TemplateExerciseNameSlider />

        <SetTableHeader />
      </LinearGradient>
    </StrobeBlur>
  );
}
