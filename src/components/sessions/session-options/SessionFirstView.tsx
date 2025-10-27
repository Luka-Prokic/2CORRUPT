import { forwardRef, Fragment } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { OptionButton } from "../../ui/buttons/OptionButton";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { useTranslation } from "react-i18next";
import { SessionNameInput } from "../../board-workout/sheets/session/SessionNameInput";

interface SessionFirstViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
}

export const SessionFirstView = forwardRef<
  BottomSheetModal,
  SessionFirstViewProps
>(({ session, setView }, ref) => {
  const { startSession, activeSession, getTemplateById } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t } = useTranslation();

  function closeSheet() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  function handleStartWorkout() {
    const template = getTemplateById(session.templateId);

    setTimeout(() => {
      if (template) startSession(template);
      else startSession(null, session.layout);
      setTypeOfView("workout");
      router.dismissTo("/");
    }, 200);

    closeSheet();
  }

  function handleViewRecap() {
    router.push(`/recap/${session.id}`);
  }

  function handleMakeTemplate() {
    setView("make");
  }

  function handleUpdateTemplate() {
    setView("update");
  }

  function handleDeleteTemplate() {
    setView("remove");
  }

  if (session)
    return (
      <Fragment>
        <SessionNameInput
          session={session}
          styleView={{ marginVertical: 16 }}
          disabled
        />
        {activeSession && (
          <Text
            style={{
              marginVertical: 4,
              color: theme.info,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            <Ionicons name="alert-circle" size={14} color={theme.error} />{" "}
            {t("sessions.active-session-warning")}
          </Text>
        )}

        <OptionButton
          title={t("sessions.repeat-workout")}
          icon={
            <Ionicons
              name="play-circle"
              size={24}
              color={activeSession ? theme.handle : theme.accent}
            />
          }
          color={activeSession ? theme.handle : theme.accent}
          onPress={handleStartWorkout}
          height={44}
          disabled={!!activeSession}
        />
        <OptionButton
          title={t("sessions.view-recap")}
          icon={
            <Ionicons name="arrow-up-circle" size={24} color={theme.info} />
          }
          onPress={handleViewRecap}
          color={theme.info}
          height={44}
        />
        <OptionButton
          title={t("sessions.add-to-templates")}
          icon={<Ionicons name="add-circle" size={24} color={theme.text} />}
          onPress={handleMakeTemplate}
          height={44}
        />

        {session.templateId && (
          <OptionButton
            title={t("sessions.update-template")}
            icon={<Ionicons name="sync-circle" size={24} color={theme.text} />}
            onPress={handleUpdateTemplate}
            height={44}
          />
        )}

        <OptionButton
          title={`${t("button.remove")} ${t("sessions.session")}`}
          icon={<Ionicons name="remove-circle" size={24} color={theme.error} />}
          color={theme.error}
          onPress={handleDeleteTemplate}
          height={44}
        />
        <Text
          style={{
            marginVertical: 16,
            color: theme.grayText,
            fontSize: 14,
            textAlign: "justify",
          }}
        >
          {t("sessions.options-info")}
        </Text>
      </Fragment>
    );
  return null;
});
