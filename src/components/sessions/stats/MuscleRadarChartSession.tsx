import { View } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import { useCategoryScoresForSession } from "../../../features/stats/useCategoryScores";
import { useMuscleScoresForSession } from "../../../features/stats/useMucleScores";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { WorkoutSession } from "../../../stores/workout";
import { fixedMuscleOrder } from "../../../config/constants/muscleOrder";

interface MuscleRadarChartSessionProps {
  session: WorkoutSession;
  size: number;
}

export function MuscleRadarChartSession({
  session,
  size,
}: MuscleRadarChartSessionProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const muscles = useMuscleScoresForSession(session) ?? [];
  const categories = useCategoryScoresForSession(session) ?? [];

  const useCategories = muscles.length > 12;
  const sourceData = useCategories ? categories : muscles;

  if (!sourceData || sourceData.length === 0) {
    return <View style={{ height: size }} />;
  }

  const usedKeys = useCategories
    ? sourceData.map((c) => c.category)
    : fixedMuscleOrder.filter((key) =>
        muscles.some(
          (m) => m.muscle?.toLowerCase().replace(/\s+/g, "-") === key
        )
      );

  const data = usedKeys.map((key) => {
    const found = sourceData.find((item: any) => {
      const id = useCategories
        ? item.category?.toLowerCase().replace(/\s+/g, "-")
        : item.muscle?.toLowerCase().replace(/\s+/g, "-");
      return id === key;
    });
    return found?.percentage ?? 0;
  });

  const labels = usedKeys.map((key) =>
    useCategories ? t(`categories.${key}`) : t(`body-parts.${key}`)
  );

  return (
    <RadarChart
      data={data}
      labels={labels}
      chartSize={size}
      noOfSections={5}
      polygonConfig={{
        fill: hexToRGBA(theme.accent, 0.8),
        stroke: theme.accent,
        strokeWidth: 4,
      }}
      gridConfig={{
        stroke: theme.handle,
        strokeWidth: 2,
        fill: "transparent",
        showGradient: false,
      }}
      labelConfigArray={labels.map(() => ({
        fontSize: useCategories ? 16 : 12,
        fontWeight: "bold",
        stroke: theme.text,
      }))}
      asterLinesConfig={{
        stroke: theme.handle,
        strokeWidth: 1,
      }}
      circular
    />
  );
}
