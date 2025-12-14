import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useFormatTime } from "../../../features/format/useFormatTime";
import { SegmentTime } from "../WHATSINTHEBOX/SegmentTime";

interface SevenSegmentSessionTimerProps {
  segmentSize?: number;
}

export function SevenSegmentSessionTimer({
  segmentSize = 44,
}: SevenSegmentSessionTimerProps) {
  const { activeSession } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const [isActive, setIsActive] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const getElapsedSeconds = () => {
    if (!activeSession?.startTime) return 0;
    return Math.floor(
      (Date.now() - new Date(activeSession.startTime).getTime()) / 1000
    );
  };

  useEffect(() => setTotalSeconds(getElapsedSeconds()), [activeSession]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      const active = state === "active";
      setIsActive(active);
      if (active) setTotalSeconds(getElapsedSeconds());
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!activeSession || !isActive) return;

    const interval = setInterval(() => {
      setTotalSeconds(getElapsedSeconds());
    }, 1000); // 1-second updates

    return () => clearInterval(interval);
  }, [activeSession, isActive]);

  const formattedTime = useFormatTime({
    seconds: totalSeconds,
    format: "seven",
  });

  const [hours, minutes, seconds] = formattedTime.split(":");

  return (
    <SegmentTime
      hours={Number(hours)}
      minutes={Number(minutes)}
      seconds={Number(seconds)}
      color={theme.fifthBackground}
      size={segmentSize}
    />
  );
}
