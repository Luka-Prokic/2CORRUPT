import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { Fragment, useCallback, useRef } from "react";
import { SessionBottomSheet } from "../session-options/SessionBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface SessionRecapCardProps {
  session: WorkoutSession;
}

export function SessionRecapCard({ session }: SessionRecapCardProps) {
  const { theme } = useSettingsStore();
  const { getTemplateById } = useWorkoutStore();
  const { widgetUnit } = useWidgetUnit();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const template = getTemplateById(session.templateId ?? "");

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

  function handlePress() {
    presentModal();
  }
  const presentModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  if (session)
    return (
      <Fragment>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            width: WIDTH - 32,
            height: widgetUnit,
            padding: 10,
            gap: 4,
            borderRadius: 32,
            backgroundColor: theme.secondaryBackground,
            shadowColor: theme.shadow,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            {startOfSession}-{endOfSession}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: theme.fifthBackground,
            }}
          >
            {session.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.info,
              marginTop: 4,
            }}
          >
            {session.layout?.length ?? 0}{" "}
            {session.layout?.length === 1 ? "exercise" : "exercises"}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.info,
              marginTop: 4,
            }}
          >
            Template used: {template?.name}
          </Text>
        </TouchableOpacity>
        <SessionBottomSheet session={session} ref={bottomSheetRef} />
      </Fragment>
    );
  return null;
}
