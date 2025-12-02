import { forwardRef } from "react";
import { WorkoutSession } from "../../../stores/workout";
import { OptionButton } from "../../ui/buttons/OptionButton";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { useTranslation } from "react-i18next";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface SessionOptionsViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
}

export const SessionOptionsView = forwardRef<
  BottomSheetModal,
  SessionOptionsViewProps
>(({ session, setView }, ref) => {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  // function handleViewRecap() {
  //   router.push(`/recap/${session.id}`);
  // }

  function handleBack() {
    setView("preview");
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
      <View style={{ paddingTop: 16 }}>
        <OptionButton
          title={t("sessions.preview")}
          icon={
            <Ionicons name="chevron-back-circle" size={24} color={theme.text} />
          }
          onPress={handleBack}
          height={44}
        />

        <OptionButton
          title={t("sessions.add-to-templates")}
          icon={<Ionicons name="add-circle" size={24} color={theme.accent} />}
          onPress={handleMakeTemplate}
          color={theme.accent}
          height={44}
        />

        {session.templateId && (
          <OptionButton
            title={t("sessions.update-template")}
            icon={<Ionicons name="sync-circle" size={24} color={theme.info} />}
            onPress={handleUpdateTemplate}
            color={theme.info}
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
        <DescriptionText
          text={t("sessions.options-info")}
          style={{ marginVertical: 16 }}
        />
      </View>
    );
  return null;
});
