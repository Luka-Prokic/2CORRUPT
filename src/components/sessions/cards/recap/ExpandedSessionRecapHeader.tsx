import { WorkoutSession } from "../../../../stores/workout";
import { TextButton } from "../../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../../stores/settings";
import { View, ViewStyle } from "react-native";
import { WIDTH } from "../../../../utils/Dimensions";
import { IText } from "../../../ui/text/IText";
import { LabeledValue } from "../../../ui/misc/LabeledValue";
import { ExpandedSessionRecapFooter } from "./ExpandedSessionRecapFooter";
import { useStartWorkoutOfSession } from "../../../../features/start/useStartWorkout";

interface ExpandedSessionRecapHeaderProps {
  session: WorkoutSession;
  style?: ViewStyle | ViewStyle[];
}

export function ExpandedSessionRecapHeader({
  session,
  style,
}: ExpandedSessionRecapHeaderProps) {
  const { t } = useTranslation();
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
    <View
      style={{
        alignItems: "center",
        width: WIDTH,
        padding: 16,
        gap: 32,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: WIDTH - 32,
          ...style,
        }}
      >
        <IText color={theme.tint} text={`${startOfSession}-${endOfSession}`} />
        <TextButton
          text={t("button.repeat")}
          onPress={useStartWorkoutOfSession(session.id)}
          textStyle={{ fontSize: 28 }}
          color={theme.fifthBackground}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <IText text={session.name} color={theme.shadow} />

        <IText
          text={session.notes ?? ""}
          weight="500"
          size={18}
          color={theme.info}
        />

        <ExpandedSessionRecapFooter session={session} />
      </View>

      <View style={{ flexDirection: "row" }}>
        <LabeledValue
          label={t("sessions.total-exercises")}
          value={session.layout.length}
          style={{ width: WIDTH / 2 - 16 }}
        />
        <LabeledValue
          label={t("sessions.total-sets")}
          value={session.totals?.totalSets ?? 1}
          style={{ width: WIDTH / 2 - 16 }}
        />
      </View>
    </View>
  );
}
