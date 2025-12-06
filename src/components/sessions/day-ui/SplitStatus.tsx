import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../utils/Dimensions";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { isToday } from "../../../features/calendar/useDate";

export function SplitStatus({ date }: { date: Date }) {
  const { theme } = useSettingsStore();
  const itsToday = isToday(date);
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (itsToday) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      pulse.value = 0;
    }
  }, [date]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 0.9]);
    const opacity = interpolate(pulse.value, [0, 1], [1, 0.4]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  function handlePress() {
    router.push("/splits/list");
  }

  return (
    <BounceButton
      onPress={handlePress}
      style={{ width: WIDTH * 0.2, height: WIDTH * 0.2 }}
      disabled={!itsToday}
    >
      <Animated.View style={[animatedStyle]}>
        <Ionicons
          name="flash"
          size={WIDTH * 0.2}
          color={itsToday ? theme.grayText : theme.handle}
        />
      </Animated.View>
    </BounceButton>
  );
}
