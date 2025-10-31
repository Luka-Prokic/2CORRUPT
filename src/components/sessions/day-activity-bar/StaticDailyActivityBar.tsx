import { useMemo } from "react";
import { View } from "react-native";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useSessionsByDate } from "../../../features/workout";
import { StaticSessionBar } from "./StaticSessionBar";
import { StaticDailyBarTimeStempts } from "./StaticDailyBarTimeStempts";

const BAR_HEIGHT = 58;

interface StaticDailyActivityBarProps {
  date: Date;
}

export function StaticDailyActivityBar({ date }: StaticDailyActivityBarProps) {
  const { fullWidth } = useWidgetUnit();
  const sessionsOnThisDate = useSessionsByDate(date);

  // --- define day boundaries
  const dayStart = useMemo(() => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [date]);

  const dayEnd = useMemo(() => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }, [date]);

  // --- sessions for the given day, clamped to day boundaries
  const sessionsForDay = useMemo(() => {
    return sessionsOnThisDate
      .map((s) => {
        const start = new Date(s.startTime);
        const end = s.endTime
          ? new Date(s.endTime)
          : new Date(start.getTime() + 45 * 60 * 1000);

        // clamp start/end to current day
        const clampedStart = start < dayStart ? dayStart : start;
        const clampedEnd = end > dayEnd ? dayEnd : end;

        // include only if overlaps with day
        if (clampedStart >= clampedEnd) return null;

        return { ...s, clampedStart, clampedEnd };
      })
      .filter(Boolean) as ((typeof sessionsOnThisDate)[number] & {
      clampedStart: Date;
      clampedEnd: Date;
    })[];
  }, [sessionsOnThisDate, dayStart, dayEnd]);

  return (
    <View
      style={{
        width: fullWidth,
        height: BAR_HEIGHT,
        marginHorizontal: 16,
      }}
    >
      <StaticSessionBar sessionsForDay={sessionsForDay} />

      <StaticDailyBarTimeStempts sessionsForDay={sessionsForDay} />
    </View>
  );
}
