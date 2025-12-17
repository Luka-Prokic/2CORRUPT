import { MidText } from "../../ui/text/MidText";
import { SplitPlanWorkout } from "../../../stores/workout/types";
import { useCorrectTime } from "../../../features/format/useCorrectTime";
import { useSettingsStore } from "../../../stores/settings";

interface ScheduledAtPlannedWorkoutTimeProps {
  workout: SplitPlanWorkout;
}

export function ScheduledAtPlannedWorkoutTime({
  workout,
}: ScheduledAtPlannedWorkoutTimeProps) {
  const { theme } = useSettingsStore();

  const scheduledAt = useCorrectTime(workout.scheduledAt ?? "");
  if (scheduledAt) return <MidText text={scheduledAt} color={theme.text} />;
  return null;
}
