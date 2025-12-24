import { View } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import { useCategoryScoresForDay } from "../../../features/stats/useCategoryScores";
import { useMuscleScoresForDay } from "../../../features/stats/useMucleScores";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { Ionicons } from "@expo/vector-icons";
import { fixedMuscleOrder } from "../../../config/constants/muscleOrder";

interface MuscleRadarChartDayProps {
  date: Date;
}

export function MuscleRadarChartDay({ date }: MuscleRadarChartDayProps) {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { t } = useTranslation();

  const muscles = useMuscleScoresForDay(date) ?? [];
  const categories = useCategoryScoresForDay(date) ?? [];

  // If too many muscles -> use categories
  const useCategories = muscles.length > 12;
  const sourceData = useCategories ? categories : muscles;

  // No data? Just reserve space
  if (!sourceData || sourceData.length === 0) {
    return (
      <View
        style={{
          width: fullWidth,
          height: fullWidth,
          marginHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="ban" size={fullWidth / 2} color={theme.handle} />
      </View>
    );
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
    <View
      style={{
        width: fullWidth,
        height: fullWidth,
        marginHorizontal: 16,
      }}
    >
      <RadarChart
        data={data}
        labels={labels}
        chartSize={fullWidth}
        noOfSections={5}
        polygonConfig={{
          fill: hexToRGBA(theme.tint, 0.8),
          stroke: theme.tint,
          strokeWidth: 4,
        }}
        gridConfig={{
          stroke: theme.handle,
          strokeWidth: 2,
          fill: "transparent",
          showGradient: false,
        }}
        labelConfigArray={labels.map(() => ({
          fontSize: useCategories ? 13 : 12,
          fontWeight: "bold",
          stroke: theme.text,
        }))}
        asterLinesConfig={{
          stroke: theme.handle,
          strokeWidth: 1,
        }}
        circular
      />
    </View>
  );
}
