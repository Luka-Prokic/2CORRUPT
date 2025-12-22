import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { View } from "react-native";
import { WaterWave } from "./WaterVawe";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useAnimatedWaterFillHeight } from "../../../../../features/water/useWaterFillHeight";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWaterStore } from "../../../../../stores/water";

export function AnimatedWater() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { getWaterConsumption, dailyWaterGoal, increment } = useWaterStore();
  const waterConsumption = getWaterConsumption();

  const { animatedFillHeight } = useAnimatedWaterFillHeight({
    waterConsumption,
    dailyWaterGoal,
    containerHeight: widgetUnit,
    duration: increment,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedFillHeight.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        },
        animatedStyle,
      ]}
    >
      <WaterWave
        width={fullWidth}
        height={32} // wave height
        color={theme.border}
      />
      <View style={{ flex: 1, backgroundColor: theme.border }} />
    </Animated.View>
  );
}
