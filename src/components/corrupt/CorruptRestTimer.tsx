import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { RestTimer } from "../ui/timer/RestTimer";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import * as Haptics from "expo-haptics";

interface CorruptRestTimerProps {
  size: number;
}

export function CorruptRestTimer({ size }: CorruptRestTimerProps) {
  const { theme } = useSettingsStore();
  const { estEndRestTime, updateEstEndRestTime, endRest } = useWorkoutStore();

  const addRest = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (estEndRestTime != null) updateEstEndRestTime(estEndRestTime + 15);
  };

  const removeRest = () => {
    if (estEndRestTime == null) return;

    const now = Math.floor(Date.now() / 1000);
    const remaining = Math.max(estEndRestTime - now, 0);

    if (remaining === 0) {
      // Timer already at 00:00 → finish rest
      endRest();

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    } else {
      // Subtract 15 seconds (or go to 0)
      const newRemaining = Math.max(remaining - 15, 0);
      updateEstEndRestTime(now + newRemaining);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  };

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        height: size,
      }}
    >
      <TouchableOpacity
        onPress={addRest}
        style={{
          width: size,
          height: size,
          backgroundColor: theme.thirdBackground,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.tint, fontWeight: "bold", fontSize: 16 }}>
          +15s
        </Text>
      </TouchableOpacity>

      <RestTimer />

      <TouchableOpacity
        onPress={removeRest}
        style={{
          width: size,
          height: size,
          backgroundColor: theme.thirdBackground,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.tint, fontWeight: "bold", fontSize: 16 }}>
          -15s
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
