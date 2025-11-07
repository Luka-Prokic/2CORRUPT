import { Ionicons } from "@expo/vector-icons";
import { useCopyWorkoutRecap } from "../../../features/workout/copyWorkoutRecap";
import { WorkoutSession } from "../../../stores/workout/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { BounceButton } from "../../ui/buttons/BounceButton";

interface CopyWorkoutButtonProps {
  session: WorkoutSession;
}

export function CopyWorkoutButton({ session }: CopyWorkoutButtonProps) {
  const { theme } = useSettingsStore();
  const { copyWorkoutRecap } = useCopyWorkoutRecap();

  if (!session) {
    return null;
  }

  return (
    <BounceButton
      onPress={() => copyWorkoutRecap(session)}
      style={{ width: 44, height: 44, padding: 10 }}
      color={"transparent"}
    >
      <Ionicons name="copy-outline" size={24} color={theme.text} />
    </BounceButton>
  );
}
