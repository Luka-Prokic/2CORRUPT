import { useEffect, useState } from "react";
import { Text, AppState, TextStyle } from "react-native";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useFormatTime } from "../../../features/format/useFormatTime";

interface SessionTimerProps {
  textStyle?: TextStyle | TextStyle[];
}

export function SessionTimer({ textStyle }: SessionTimerProps) {
  const { activeSession } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const [isActive, setIsActive] = useState(true); // App in foreground?
  const [sessionTime, setSessionTime] = useState(0);

  const getElapsed = () => {
    if (!activeSession?.startTime) return 0;
    return Math.floor(
      (Date.now() - new Date(activeSession.startTime).getTime()) / 1000
    );
  };

  // Sync time on mount
  useEffect(() => {
    setSessionTime(getElapsed());
  }, [activeSession]);

  // AppState listener
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      const active = state === "active";
      setIsActive(active);

      if (active) {
        // Re-sync immediately on return
        setSessionTime(getElapsed());
      }
    });

    return () => subscription.remove();
  }, []);

  // Tick only when app and session are active
  useEffect(() => {
    if (!activeSession || !isActive) return;

    const interval = setInterval(() => {
      setSessionTime(getElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, isActive]);

  const formattedTime = useFormatTime({
    seconds: sessionTime,
    format: "auto+",
  });

  return (
    <Text
      style={{
        color: theme.border,
        fontSize: 20,
        fontWeight: "bold",
        ...textStyle,
      }}
    >
      {formattedTime}
    </Text>
  );
}
