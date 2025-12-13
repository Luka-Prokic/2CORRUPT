import { Fragment } from "react";
import { StrobeButton } from "../../../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../../stores/workout";
import { View } from "react-native";
import { ActiveSessionFooter } from "./ActiveSessionFooter";
import { ActiveSessionHeader } from "./ActiveSessionHeader";
import { ExerciseName } from "../../../../view-workout/table/header/ExerciseName";

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
        freeze
      >
        <ActiveSessionHeader />
        <View
          style={{
            flex: 1,
            width: fullWidth,
            flexDirection: "row",
            gap: 16,
            paddingHorizontal: 8,
          }}
        >
          <ExerciseName />
        </View>
        {/* <ActiveSessionFooter /> */}
      </StrobeButton>
    </Fragment>
  );
}
