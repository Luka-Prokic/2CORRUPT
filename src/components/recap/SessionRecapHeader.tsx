import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";

interface SessionRecapHeaderProps {
  sessionId: string | string[];
}

export function SessionRecapHeader({ sessionId }: SessionRecapHeaderProps) {
  const { theme } = useSettingsStore();

  const { completedSessions } = useWorkoutStore();

  const session = completedSessions.find((s) => s.id === sessionId);
  const sessionName = session?.name;

  return (
    <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>
      {sessionName || "ses"}
    </Text>
  );
}
