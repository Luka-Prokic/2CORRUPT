import { LinearGradient } from "expo-linear-gradient";
import { SvgGaugeLines } from "./SvgGuageLines";
import { useWaterGaugeLines } from "../../../../../features/water/useWaterGuageLines";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";

interface WaterContainerProps {
  children: React.ReactNode;
  goalLiters: number;
}

export function WaterContainer({ children, goalLiters }: WaterContainerProps) {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();

  const { lines, majorEvery } = useWaterGaugeLines({
    goalLiters,
  });

  const color = theme.accent;

  return (
    <LinearGradient
      colors={[
        color,
        color + "80",
        color + "80",
        color + "80",
        color + "80",
        color,
      ]}
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}
    >
      {/* Gauge */}
      <SvgGaugeLines
        width={44}
        height={widgetUnit}
        lines={lines}
        majorEvery={majorEvery}
        minorColor={theme.border + "80"}
        majorColor={theme.border}
      />

      {children}
    </LinearGradient>
  );
}
