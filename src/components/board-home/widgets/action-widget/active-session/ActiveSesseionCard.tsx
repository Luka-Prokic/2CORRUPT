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

  function handlePress() {
    console.log("handlePress");
  }

  function handleLongPress() {
    console.log("handleLongPress");
  }

  if (!activeSession) return null;

  return (
    <Fragment>
      <StrobeButton
        style={{
          height: widgetUnit,
          width: fullWidth,
          borderWidth: 1,
          borderColor: theme.thirdBackground + "40",
          borderRadius: 32,
        }}
        styleContent={{
          height: widgetUnit,
          width: fullWidth,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 44,
        }}
        onPress={handlePress}
        onLongPress={handleLongPress}
        strobeColors={[theme.border, theme.border, theme.border, theme.border]}
      >
        <ActiveSessionHeader />
        <SevenSegmentSessionTimer segmentSize={32} />
      </StrobeButton>
    </Fragment>
  );
}
