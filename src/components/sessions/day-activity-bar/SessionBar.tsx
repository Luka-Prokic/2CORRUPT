import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { Animated } from "react-native";
import { Text } from "react-native";

const BAR_HEIGHT = 34;

interface SessionBarProps {
  sessionsForDay: any[];
  zoom: boolean;
  zoomAnim: Animated.Value;
}

export function SessionBar({
  sessionsForDay,
  zoom,
  zoomAnim,
}: SessionBarProps) {
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
  const pctToPx = (pct: number) => (pct / 100) * fullWidth;
  const interpolateLeft = (pct: number) =>
    zoomAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        pctToPx(pct),
        pctToPx(((pct - paddedStart) / visibleRange) * 100),
      ],
    });
  const interpolateWidth = (startPct: number, endPct: number) =>
    zoomAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        pctToPx(endPct - startPct),
        pctToPx(((endPct - startPct) / visibleRange) * 100),
      ],
    });

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
    <LinearGradient
      colors={[
        hexToRGBA(theme.background, 1),
        hexToRGBA(theme.background, 0),
        hexToRGBA(theme.background, 0),
        hexToRGBA(theme.background, 0),
        hexToRGBA(theme.background, 1),
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: fullWidth,
        height: BAR_HEIGHT,
        backgroundColor: hexToRGBA(theme.handle, 0.5),
        overflow: "hidden",
      }}
    >
      {sessionsForDay.map((session, i) => {
        const left = interpolateLeft(getPercent(session.clampedStart));
        const width = interpolateWidth(
          getPercent(session.clampedStart),
          getPercent(session.clampedEnd)
        );
        return (
          <Animated.View
            key={session.id}
            style={{
              position: "absolute",
              left,
              width,
              height: BAR_HEIGHT,
              backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {zoom && (
              <Text
                style={{
                  color: theme.tint,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                adjustsFontSizeToFit
                numberOfLines={1}
                minimumFontScale={0.5}
              >
                {Math.round(
                  (session.clampedEnd - session.clampedStart) / 60000
                )}{" "}
                min
              </Text>
            )}
          </Animated.View>
        );
      })}
      {ticks.map((t, i) => (
        <Animated.View
          key={`tick-${i}`}
          style={{
            position: "absolute",
            left: tickLeft(t),
            bottom: 0,
            width: 1,
            height: 34,
            transform: [{ translateX: t.label === "24h" ? -1 : 0 }],
            backgroundColor: theme.handle,
          }}
        />
      ))}
    </LinearGradient>
  );
}
