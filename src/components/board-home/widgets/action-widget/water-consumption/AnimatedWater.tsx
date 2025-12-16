import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { View } from "react-native";
import { WaterWave } from "./WaterVawe";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useAnimatedWaterFillHeight } from "../../../../../features/water/useWaterFillHeight";
import { useSettingsStore } from "../../../../../stores/settingsStore";

interface AnimatedWaterProps {
  drinkAmount: number;
  increment: number;
  goalLiters: number;
}

export function AnimatedWater({
  drinkAmount,
  increment,
  goalLiters,
}: AnimatedWaterProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();

  const { animatedFillHeight } = useAnimatedWaterFillHeight({
    consumedLiters: drinkAmount,
    goalLiters: goalLiters * 1000,
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
        color={theme.handle}
      />
      <View style={{ flex: 1, backgroundColor: theme.handle }} />
    </Animated.View>
  );
}
