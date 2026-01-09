import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useFormatTime } from "../../../features/format/useFormatTime";
import { SegmentTime } from "../WHATSINTHEBOX/SegmentTime";
import { WIDTH } from "../../../utils/Dimensions";

interface SevenSegmentSessionTimerProps {
  segmentSize?: number;
  color?: string;
  fitWidth?: number;
  fitHeight?: number;
}

export function SevenSegmentSessionTimer({
  segmentSize,
  color = "white",
  fitWidth = WIDTH,
  fitHeight,
}: SevenSegmentSessionTimerProps) {
  const { activeSession } = useWorkoutStore();
  const [isActive, setIsActive] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(0);

  //Auto sizing logic to fit the width or height of the container
  const byWidth = segmentSize ? segmentSize : fitWidth ? fitWidth / 9.5 : 0;
  const byHeight = segmentSize ? segmentSize : fitHeight ? fitHeight / 2.5 : 0;

  const size =
    byWidth > byHeight && byHeight > 0
      ? Math.floor(byHeight)
      : Math.floor(byWidth);

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
      color={color}
      size={size}
      inactiveOpacity={0.1}
      weight="bold"
    />
  );
}
