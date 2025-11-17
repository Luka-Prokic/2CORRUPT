import { Animated } from "react-native";
import { WorkoutSession } from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { Fragment } from "react";
import { Text } from "react-native";
import { View } from "react-native";

interface SessionRecapCardHeaderProps {
  session: WorkoutSession;
}

export function SessionRecapCardHeader({
  session,
}: SessionRecapCardHeaderProps) {
  const { theme } = useSettingsStore();

  const startOfSession = new Date(session.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ensures 24-hour format
  });

  const endOfSession = new Date(session.endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <View>
      <Animated.Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.tint,
        }}
      >
        {startOfSession}-{endOfSession}
      </Animated.Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          textAlignVertical: "center",
          color: theme.shadow,
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.5}
      >
        {session.name}
      </Text>
    </View>
  );
}
