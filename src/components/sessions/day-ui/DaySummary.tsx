import React from "react";
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

      <View style={{ position: "absolute", top: 16, left: 16 }}>
        <DayBadge date={date} />
      </View>

      <View style={{ position: "absolute", top: 16, right: 16 }}>
        <DayAchievements />
      </View>

      <View style={{ position: "absolute", bottom: 16, left: 16 }}>
        <WeeklyProgress />
      </View>

      <View style={{ position: "absolute", bottom: 16, right: 16 }}>
        <SplitStatus />
      </View>
    </View>
  );
}
