import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { copyWorkoutRecap } from "../../../features/workout/copyWorkoutRecap";
import { WorkoutSession } from "../../../stores/workout/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { BounceButton } from "../../ui/buttons/BounceButton";

interface CopyWorkoutButtonProps {
  sessionId: string | string[];
}

export function CopyWorkoutButton({ sessionId }: CopyWorkoutButtonProps) {
  const { completedSessions } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const session: WorkoutSession | undefined = completedSessions.find(
    (s) => s.id === sessionId
  );

  if (!session) {
    return null;
  }

  return (
    <BounceButton
      onPress={() => copyWorkoutRecap({ session })}
      style={{ width: 44, height: 44, padding: 10 }}
      color={"transparent"}
    >
      <Ionicons name="copy-outline" size={24} color={theme.text} />
    </BounceButton>
  );
}
