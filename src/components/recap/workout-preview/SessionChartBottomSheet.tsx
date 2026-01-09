import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IBottomSheet } from "../../ui/IBottomSheet";
import { RadarChart } from "react-native-gifted-charts";
import { useMuscleScoresForSession } from "../../../features/stats/useMucleScores";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";

interface SessionPreviewBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function SessionChartBottomSheet({
  ref,
}: SessionPreviewBottomSheetProps) {
  const { t } = useTranslation();
  const { activeSession } = useWorkoutStore();
  const { fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const data = useMuscleScoresForSession(activeSession);

  return (
    <IBottomSheet ref={ref}>
      <RadarChart
        data={data.map((item) => item.percentage)}
        labels={data.map((item) => `${t(`body-parts.${item.muscle}`)}`)}
        polygonConfig={{
          fill: theme.fifthBackground + "80",
          stroke: theme.fifthBackground,
          strokeWidth: 6,
          opacity: 1,
        }}
        gridConfig={{
          fill: theme.navBackground,
          gradientColor: theme.handle,
          stroke: theme.info + "80",
          strokeWidth: 2,
          strokeDashArray: [8, 2],
        }}
        labelConfig={{
          fontSize: 14,
          fontWeight: "bold",
          stroke: theme.text,
        }}
        chartSize={fullWidth}
        circular
      />
    </IBottomSheet>
  );
}
