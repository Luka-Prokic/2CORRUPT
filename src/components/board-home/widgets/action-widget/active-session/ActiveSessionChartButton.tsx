import { Fragment, useRef } from "react";
import { BounceButton } from "../../../../ui/buttons/BounceButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SessionChartBottomSheet } from "../../../../recap/workout-preview/SessionChartBottomSheet";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { RadarChart } from "react-native-gifted-charts";
import { useWorkoutStore } from "../../../../../stores/workout/useWorkoutStore";
import { useMuscleScoresForSession } from "../../../../../features/stats/useMucleScores";

export function ActiveSessionChartButton() {
  const { theme } = useSettingsStore();
  const sessionChartBottomSheetRef = useRef<BottomSheetModal>(null);
  const { activeSession } = useWorkoutStore();
  const data = useMuscleScoresForSession(activeSession);

  function handlePress() {
    sessionChartBottomSheetRef.current?.present();
  }

  return (
    <Fragment>
      <BounceButton onPress={handlePress} style={{ width: 64, height: 64 }}>
        <RadarChart
          data={data.map((item) => item.percentage)}
          polygonConfig={{
            fill: theme.fifthBackground + "80",
            stroke: theme.fifthBackground,
            strokeWidth: 3,
            opacity: 1,
          }}
          gridConfig={{
            fill: theme.handle,
            gradientColor: theme.handle,
            stroke: theme.info + "80",
            strokeWidth: 1,
            strokeDashArray: [8, 2],
          }}
          chartSize={64}
          hideLabels
          circular
        />
      </BounceButton>
      <SessionChartBottomSheet ref={sessionChartBottomSheetRef} />
    </Fragment>
  );
}
