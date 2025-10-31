import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { Text } from "react-native";
import { Fragment } from "react";
import { View } from "react-native";

const BAR_HEIGHT = 34;

interface StaticSessionBarProps {
  sessionsForDay: any[];
}

export function StaticSessionBar({ sessionsForDay }: StaticSessionBarProps) {
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
    pctToPx(((pct - paddedStart) / visibleRange) * 100);
  const interpolateWidth = (startPct: number, endPct: number) =>
    pctToPx(((endPct - startPct) / visibleRange) * 100);

  // --- tick granularity
  const visibleHours = (visibleRange / 100) * 24;
  const tickHours =
    visibleHours > 18
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
  const ticks: { label: string; zoomedPx: number }[] = [];
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
      zoomedPx: pctToPx(zoomedPct),
    });
  }

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
      {sessionsForDay.length ? (
        <Fragment>
          {sessionsForDay.map((session) => {
            const left = interpolateLeft(getPercent(session.clampedStart));
            const width = interpolateWidth(
              getPercent(session.clampedStart),
              getPercent(session.clampedEnd)
            );
            return (
              <View
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
              </View>
            );
          })}
        </Fragment>
      ) : (
        <View
          style={{
            width: fullWidth,
            height: BAR_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.info,
              fontSize: 14,
              fontWeight: "bold",
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.5}
          >
            No Sessions
          </Text>
        </View>
      )}

      {ticks.map((t) => (
        <View
          key={`tick-${t.label}`}
          style={{
            position: "absolute",
            left: t.zoomedPx,
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
