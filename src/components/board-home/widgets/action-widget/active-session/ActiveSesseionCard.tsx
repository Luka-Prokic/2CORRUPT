import { Fragment } from "react";
import { StrobeButton } from "../../../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../../stores/workout";
import { ActiveSessionHeader } from "./ActiveSessionHeader";
import { SevenSegmentSessionTimer } from "../../../../ui/timer/SevenSegmentSessionTimer";
import { CorruptRestTimer } from "../../../../corrupt/CorruptRestTimer";
import { View } from "react-native";
import { ActiveSessionChartButton } from "./ActiveSessionChartButton";
import { ActiveSessionPreviewButton } from "./ActiveSessionPreviewButton";

export function ActiveSessionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { activeSession, restingExerciseId } = useWorkoutStore();

  const softGlow = theme.fifthAccent + "80";

  if (!activeSession) return null;

  return (
    <Fragment>
      <StrobeButton
        style={{
          height: widgetUnit,
          width: fullWidth,
          borderRadius: 32,
        }}
        styleContent={{
          height: widgetUnit,
          width: fullWidth,
          paddingTop: 44,
          backgroundColor: theme.thirdAccent + "40",
          borderWidth: 1,
          borderColor: theme.thirdAccent + "20",
          borderRadius: 32,
        }}
        pressable
        strobeColors={[softGlow, softGlow, softGlow, softGlow]}
      >
        <ActiveSessionHeader />
        {restingExerciseId ? (
          <View
            style={{
              width: fullWidth - 32,
              height: 64,
            }}
          >
            <CorruptRestTimer size={64} fontSize={48} />
          </View>
        ) : (
          <SevenSegmentSessionTimer
            segmentSize={24}
            color={theme.secondaryAccent}
          />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ActiveSessionPreviewButton />
          <ActiveSessionChartButton />
        </View>
      </StrobeButton>
    </Fragment>
  );
}
