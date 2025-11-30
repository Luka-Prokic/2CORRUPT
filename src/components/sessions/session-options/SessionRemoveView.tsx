import { forwardRef, Fragment } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";

interface SessionRemoveViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
}

export const SessionRemoveView = forwardRef<
  BottomSheetModal,
  SessionRemoveViewProps
>(({ session, setView }, ref) => {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { removeSession } = useWorkoutStore();

  const handleRemoveSession = () => {
    removeSession(session.id);
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  };

  const handleCancel = () => {
    setView("options");
  };

  if (session)
    return (
      <Fragment>
        <Text
          style={{
            marginVertical: 16,
            color: theme.error,
            fontWeight: "500",
            fontSize: 28,
            textAlign: "center",
          }}
        >
          {t("button.remove")}
          <Text
            style={{
              color: theme.text,
              fontWeight: "bold",
            }}
          >
            {session.name}
          </Text>{" "}
          ?
        </Text>

        <TwoOptionStrobeButtons
          labelOne={t("button.cancel")}
          labelTwo={t("button.remove")}
          onOptionOne={handleCancel}
          onOptionTwo={handleRemoveSession}
          styleTwo={{ backgroundColor: theme.error }}
        />

        <Text
          style={{
            marginVertical: 16,
            color: theme.info,
            fontSize: 14,
            fontWeight: "500",
            textAlign: "justify",
          }}
        >
          <Ionicons name="alert-circle" color={theme.error} size={14} />{" "}
          {t("sessions.remove-info")}
        </Text>
      </Fragment>
    );
  return null;
});
