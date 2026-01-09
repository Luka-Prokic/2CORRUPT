import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IBottomSheet } from "../../ui/IBottomSheet";
import { RadarChart } from "react-native-gifted-charts";
import { useMuscleScoresForSession } from "../../../features/stats/useMucleScores";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";
import { useSessionCompletionRatio } from "../../../features/workout/useSessionHistory";

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
  const isCompleted = useSessionCompletionRatio(activeSession);

  const maxValue = isCompleted === 1 ? 120 : 150;

  return (
    <IBottomSheet ref={ref}>
      <RadarChart
        data={data.map((item) => item.percentage)}
        polygonConfig={{
          fill: theme.fifthBackground + "80",
          stroke: theme.fifthBackground,
          strokeWidth: 4,
          opacity: 1,
        }}
        gridConfig={{
          fill: theme.navBackground,
          gradientColor: theme.handle,
          stroke: theme.info + "80",
          strokeWidth: 2,
          strokeDashArray: [32, 4],
        }}
        asterLinesConfig={{
          stroke: theme.info + "20",
          strokeWidth: 2,
          strokeDashArray: [1, 0],
        }}
        labels={data.map((item) => `${t(`body-parts.${item.muscle}`)}`)}
        labelConfig={{
          fontSize: 14,
          fontWeight: "bold",
          stroke: theme.text,
        }}
        maxValue={maxValue}
        noOfSections={3}
        chartSize={fullWidth}
        circular
      />
    </IBottomSheet>
  );
}
