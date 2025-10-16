import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { WorkoutSession } from "../../stores/workout";

interface SessionRecapHeaderProps {
  session: WorkoutSession;
}

export function SessionRecapHeader({ session }: SessionRecapHeaderProps) {
  const { theme } = useSettingsStore();

  if (!session) {
    return null;
  }

  const sessionName = session?.name;

  return (
    <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>
      {sessionName || "ses"}
    </Text>
  );
}
