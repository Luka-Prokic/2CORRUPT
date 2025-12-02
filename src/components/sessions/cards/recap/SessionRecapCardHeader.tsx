import { Animated } from "react-native";
import { WorkoutSession } from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { Text } from "react-native";
import { View } from "react-native";
import { IText } from "../../../ui/text/IText";
import { MidText } from "../../../ui/text/MidText";

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
      <IText color={theme.tint} text={`${startOfSession}-${endOfSession}`} />

      <MidText
        text={session.name}
        color={theme.shadow}
        style={{ textAlign: "left" }}
      />
    </View>
  );
}
