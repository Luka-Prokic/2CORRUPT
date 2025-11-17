import { View } from "react-native";
import { DayBadge } from "./DayBadge";
import { DayAchievements } from "./DayAchievements";
import { WeeklyProgress } from "./WeeklyProgress";
import { SplitStatus } from "./SplitStatus";
import { MuscleRadarChartDay } from "../stats/MuscleRadarChartDay";
import { WIDTH } from "../../../features/Dimensions";

interface DaySummaryProps {
  date: Date;
}

export function DaySummary({ date }: DaySummaryProps) {
  return (
    <View
      style={{
        width: WIDTH,
        height: WIDTH,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuscleRadarChartDay date={date} />
    </View>
  );
}
