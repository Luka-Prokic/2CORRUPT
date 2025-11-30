import { useEffect, useState } from "react";
import { Text, AppState, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useFormatTime } from "../../../features/format/useFormatTime";

interface RestTimerProps {
  textStyle?: TextStyle | TextStyle[];
  onEnd?: () => void;
}

export function RestTimer({ textStyle, onEnd }: RestTimerProps) {
  const { theme } = useSettingsStore();
  const { estEndRestTime } = useWorkoutStore(); // absolute end timestamp in seconds

  const [isActive, setIsActive] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);

  // AppState listener
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      setIsActive(state === "active");
    });
    return () => sub.remove();
  }, []);

  // Update remaining every second
  useEffect(() => {
    if (!estEndRestTime) {
      setRemaining(null);
      return;
    }

    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      const r = Math.max(estEndRestTime - now, 0);
      setRemaining(r);
      if (r === 0) onEnd?.();
    };

    tick(); // immediate update
    const id = setInterval(() => {
      if (isActive) tick();
    }, 1000);

    return () => clearInterval(id);
  }, [estEndRestTime, isActive, onEnd]);

  const formattedTime = useFormatTime({ seconds: remaining, format: "auto+" });

  if (remaining === null) return null;

  return (
    <Text
      style={{
        color: theme.fifthBackground,
        fontSize: 32,
        fontWeight: "bold",
        ...textStyle,
      }}
    >
      {formattedTime}
    </Text>
  );
}
