import { View } from "react-native";
import { MuscleRadarChartDay } from "../stats/MuscleRadarChartDay";
import { WIDTH } from "../../../utils/Dimensions";

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
