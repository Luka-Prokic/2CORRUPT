import { Fragment } from "react";
import { StrobeButton } from "../../../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../../stores/workout";
import { ActiveSessionHeader } from "./ActiveSessionHeader";
import { SevenSegmentSessionTimer } from "../../../../ui/timer/SevenSegmentSessionTimer";

export function ActiveSessionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();

  const softGlow = theme.fifthBackground + "40";

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
          borderWidth: 1,
          borderColor: theme.tint + "40",
          borderRadius: 32,
        }}
        pressable
        strobeColors={[softGlow, softGlow, softGlow, softGlow]}
      >
        <ActiveSessionHeader />

        <SevenSegmentSessionTimer
          segmentSize={36}
          color={theme.secondaryAccent}
        />
      </StrobeButton>
    </Fragment>
  );
}
