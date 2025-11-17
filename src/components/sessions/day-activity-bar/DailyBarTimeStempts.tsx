import { Fragment } from "react";
import { Animated, Text } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

interface DailyBarTimeStemptsProps {
  sessionsForDay: any[];
  zoom: boolean;
  zoomAnim: Animated.Value;
}
export function DailyBarTimeStempts({
  sessionsForDay,
  zoom,
  zoomAnim,
}: DailyBarTimeStemptsProps) {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  // --- helper: time of day -> percent of 24h
  const getPercent = (time: Date) => {
    const hours =
      time.getHours() + time.getMinutes() / 60 + time.getSeconds() / 3600;
    return (hours / 24) * 100;
  };

  // --- compute workout window (in percent)
  const rawMinStart = sessionsForDay.length
    ? Math.min(...sessionsForDay.map((s) => getPercent(s.clampedStart)))
    : 0;
  const rawMaxEnd = sessionsForDay.length
    ? Math.max(...sessionsForDay.map((s) => getPercent(s.clampedEnd)))
    : 100;

  const paddedStart = Math.max(rawMinStart - 5, 0);
  const paddedEnd = Math.min(rawMaxEnd + 5, 100);
  const visibleRange = Math.max(paddedEnd - paddedStart, 0.0001);
  // --- helpers: pct -> px
  const pctToPx = (pct: number) => (pct / 100) * fullWidth;
  // --- tick granularity
  const visibleHours = (visibleRange / 100) * 24;
  const tickHours = !zoom
    ? 6
    : visibleHours > 18
    ? 6
    : visibleHours > 12
    ? 4
    : visibleHours > 8
    ? 3
    : visibleHours > 4
    ? 2
    : 1;

  const steps = Math.ceil(24 / tickHours);

  // --- build ticks
  const ticks: { label: string; basePx: number; zoomedPx: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const h = Math.min(i * tickHours, 24);
    const basePct = (h / 24) * 100;
    const zoomedPct = ((basePct - paddedStart) / visibleRange) * 100;
    const label =
      tickHours >= 1
        ? `${Math.round(h)}h`
        : `${String(Math.floor(h)).padStart(2, "0")}:${String(
            Math.round((h % 1) * 60)
          ).padStart(2, "0")}`;
    ticks.push({
      label,
      basePx: pctToPx(basePct),
      zoomedPx: pctToPx(zoomedPct),
    });
  }

  const tickLeft = (tick: { basePx: number; zoomedPx: number }) =>
    zoomAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [tick.basePx, tick.zoomedPx],
    });

  return (
    <Fragment>
      {ticks.map((t, i) => (
        <Animated.View
          key={`tick-${i}`}
          style={{
            position: "absolute",
            left: tickLeft(t),
            bottom: 0,
            width: 44,
            height: 24,
            transform: [{ translateX: -22 }],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: theme.info,
              textAlign: "center",
            }}
          >
            {t.label}
          </Text>
        </Animated.View>
      ))}
    </Fragment>
  );
}
