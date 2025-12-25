import { WorkoutSession } from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { View } from "react-native";
import { IText } from "../../../ui/text/IText";
import { MidText } from "../../../ui/text/MidText";
import { useCorrectTime } from "../../../../features/format/useCorrectTime";

interface SessionRecapCardHeaderProps {
  session: WorkoutSession;
}

export function SessionRecapCardHeader({
  session,
}: SessionRecapCardHeaderProps) {
  const { theme } = useSettingsStore();

  const startOfSession = useCorrectTime(session.startTime);

  const endOfSession = useCorrectTime(session.endTime);

  return (
    <View>
      <IText
        color={theme.secondaryAccent}
        text={`${startOfSession}-${endOfSession}`}
        adjustsFontSizeToFit
        numberOfLines={1}
      />

      <MidText
        text={session.name}
        color={theme.shadow}
        style={{ textAlign: "left" }}
        adjustsFontSizeToFit
        numberOfLines={1}
      />
    </View>
  );
}
