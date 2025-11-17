import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  useWorkoutStore,
  WorkoutSession,
} from "../../../../stores/workoutStore";

interface SessionNameProps {
  session?: WorkoutSession;
  fontSize?: number;
  textColor?: string;
  styleText?: TextStyle | TextStyle[];
  styleView?: ViewStyle | ViewStyle[];
}

export function SessionName({
  session,
  fontSize,
  textColor,
  styleText,
  styleView,
}: SessionNameProps) {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();

  const sessionName = session?.name || activeSession?.name;

  return (
    <View style={{ alignItems: "center", ...styleView }}>
      <Text
        style={{
          fontSize: fontSize ?? 56,
          fontWeight: "bold",
          color: textColor ?? theme.text,
          ...styleText,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
      >
        {sessionName}
      </Text>
    </View>
  );
}
