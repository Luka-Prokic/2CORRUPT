import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { RestTimer } from "../ui/timer/RestTimer";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useHaptics } from "../../features/ui/useHaptics";

interface CorruptRestTimerProps {
  size: number;
  fontSize?: number;
}

export function CorruptRestTimer({
  size,
  fontSize = 36,
}: CorruptRestTimerProps) {
  const { theme } = useSettingsStore();
  const { estEndRestTime, updateEstEndRestTime, endRest, startRestTime } =
    useWorkoutStore();
  const triggerHapticsSoft = useHaptics({ modeType: "on", hapticType: "soft" });
  const triggerHapticsRigid = useHaptics({
    modeType: "gentle",
    hapticType: "rigid",
  });

  const addRest = () => {
    const now = Math.floor(Date.now() / 1000);
    const trueTime = Math.max(now - startRestTime, 0);

    const trueTimeIsBigger = trueTime > estEndRestTime - startRestTime;

    const newEstEndRestTime =
      15 + (trueTimeIsBigger ? trueTime + startRestTime : estEndRestTime);

    triggerHapticsSoft();
    if (estEndRestTime != null) updateEstEndRestTime(newEstEndRestTime);
  };

  const removeRest = () => {
    if (estEndRestTime == null) return;

    const now = Math.floor(Date.now() / 1000);
    const remaining = Math.max(estEndRestTime - now, 0);

    if (remaining === 0) {
      // Timer already at 00:00 → finish rest
      endRest();

      triggerHapticsRigid();
    } else {
      // Subtract 15 seconds (or go to 0)
      const newRemaining = Math.max(remaining - 15, 0);
      updateEstEndRestTime(now + newRemaining);

      triggerHapticsSoft();
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
          backgroundColor: theme.secondaryAccent,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.border,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          +15s
        </Text>
      </TouchableOpacity>

      <RestTimer textStyle={{ fontSize: fontSize }} />

      <TouchableOpacity
        onPress={removeRest}
        style={{
          width: size,
          height: size,
          backgroundColor: theme.secondaryAccent,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.border,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          -15s
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
