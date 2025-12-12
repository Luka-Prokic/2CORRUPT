import { Fragment } from "react";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { BlurView } from "expo-blur";
import { IText } from "../../../ui/text/IText";
import { useWorkoutStore } from "../../../../stores/workout";
import { SessionTimer } from "../../../ui/timer/SessionTimer";

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
        }}
        onPress={handlePress}
        onLongPress={handleLongPress}
      >
        <BlurView
          style={{
            width: fullWidth,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <IText text={activeSession.name} color={theme.text} />
        </BlurView>
        <SessionTimer />
      </StrobeButton>
    </Fragment>
  );
}
