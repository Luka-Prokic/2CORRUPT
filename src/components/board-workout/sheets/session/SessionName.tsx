import { Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  useWorkoutStore,
  WorkoutSession,
} from "../../../../stores/workoutStore";

interface SessionNameProps {
  session?: WorkoutSession;
  fontSize?: number;
  textColor?: string;
}

export function SessionName({
  session,
  fontSize,
  textColor,
}: SessionNameProps) {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();

  const sessionName = session?.name || activeSession?.name;

  return (
    <Text
      style={{
        fontSize: fontSize ?? 56,
        fontWeight: "bold",
        color: textColor ?? theme.text,
      }}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {sessionName}
    </Text>
  );
}
