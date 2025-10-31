import { useMemo, useRef, useState } from "react";
import { View, Animated, Pressable, Text } from "react-native";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { WIDTH } from "../../../features/Dimensions";
import { SessionBar } from "./SessionBar";
import { DailyBarTimeStempts } from "./DailyBarTimeStempts";
import { useSettingsStore } from "../../../stores/settings";
import { useSessionsByDate } from "../../../features/workout";

const BAR_HEIGHT = 58;

interface DailyActivityBarProps {
  date: Date;
}

export function DailyActivityBar({ date }: DailyActivityBarProps) {
  const { fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
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

  const [zoom, setZoom] = useState(sessionsForDay.length > 0);

  const zoomAnim = useRef(new Animated.Value(zoom ? 1 : 0)).current;

  // --- zoom toggle (animated)
  const handleZoomToggle = () => {
    Animated.spring(zoomAnim, {
      toValue: zoom ? 0 : 1,
      speed: 6,
      bounciness: 2,
      useNativeDriver: false,
    }).start();
    setZoom((z) => !z);
  };

  return (
    <View
      style={{
        width: WIDTH,
        overflow: "hidden",
        height: BAR_HEIGHT + 20,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          height: 20,
          color: theme.info,
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        {sessionsForDay.length
          ? `Tap to ${zoom ? "unzoom" : "zoom"}`
          : "No sessions"}
      </Text>
      <Pressable
        onPress={handleZoomToggle}
        style={{
          width: fullWidth,
          height: BAR_HEIGHT,
        }}
        disabled={!sessionsForDay.length}
      >
        <SessionBar
          sessionsForDay={sessionsForDay}
          zoom={zoom}
          zoomAnim={zoomAnim}
        />

        <DailyBarTimeStempts
          sessionsForDay={sessionsForDay}
          zoom={zoom}
          zoomAnim={zoomAnim}
        />
      </Pressable>
    </View>
  );
}
