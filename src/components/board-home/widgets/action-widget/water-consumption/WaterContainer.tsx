import { LinearGradient } from "expo-linear-gradient";
import { SvgGaugeLines } from "./SvgGuageLines";
import { useWaterGaugeLines } from "../../../../../features/water/useWaterGuageLines";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useWaterStore } from "../../../../../stores/water";
import { BlurView } from "expo-blur";
import { View } from "react-native";

interface WaterContainerProps {
  children: React.ReactNode;
}

export function WaterContainer({ children }: WaterContainerProps) {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { dailyWaterGoal } = useWaterStore();

  const { lines, majorEvery } = useWaterGaugeLines({
    dailyWaterGoal,
  });

  const color = theme.accent;

  return (
    <LinearGradient
      colors={[
        color,
        theme.glow + "80",
        color + "80",
        color + "80",
        color + "80",
        color + "80",
        color + "80",
        color + "80",
        color,
      ]}
      style={{
        flex: 1,
      }}
    >
      <BlurView
        intensity={8}
        tint="light"
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Gauge */}
        <View style={{ position: "absolute", left: 0 }}>
          <SvgGaugeLines
            width={32}
            height={widgetUnit}
            lines={lines}
            majorEvery={majorEvery}
            minorColor={theme.border + "80"}
            majorColor={theme.border}
          />
        </View>

        {children}
      </BlurView>
    </LinearGradient>
  );
}
