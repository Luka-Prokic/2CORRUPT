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

      {/* <View style={{ position: "absolute", top: 4, left: 4 }}>
        <WeeklyProgress date={date} />
      </View>

      <View style={{ position: "absolute", top: 4, right: 4 }}>
        <DayBadge date={date} />
      </View>

      <View style={{ position: "absolute", bottom: 4, left: 4 }}>
        <DayAchievements />
      </View>

      <View style={{ position: "absolute", bottom: 4, right: 4 }}>
        <SplitStatus date={date} />
      </View> */}
    </View>
  );
}
