import { forwardRef, Fragment } from "react";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { OptionButton } from "../../ui/buttons/OptionButton";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { useTranslation } from "react-i18next";
import { TemplateNameInput } from "../../board-home/widgets/templates-widget/cards/TemplateNameInput";
import { ActiveSessionAlert } from "../../ui/alerts/ActiveSessionAlert";
import { useKeyboardHeight } from "../../../features/ui/useKeyboardHeight";

interface TemplateOptionsViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
  onAddToSplit: () => void;
}

export const TemplateOptionsView = forwardRef<
  BottomSheetModal,
  TemplateOptionsViewProps
>(({ template, setView, onAddToSplit }, ref) => {
  const { editTemplate, activeSession } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t } = useTranslation();
  const bottomSpace = useKeyboardHeight(16);

  function handleStartWorkout() {
    setView("preview");
  }

  function handleEditTemplate() {
    setTimeout(() => {
      editTemplate(template.id);
      setTypeOfView("template");
      router.dismissTo("/");
    }, 200);
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  function handleCloneTemplate() {
    setView("clone");
  }

  function handleDeleteTemplate() {
    setView("delete");
  }

  function handleAddToSplit() {
    onAddToSplit();
  }

  return (
    <Fragment>
      <TemplateNameInput
        template={template}
        styleView={{ marginTop: 16, marginBottom: bottomSpace }}
      />

      <OptionButton
        title={t("templates.back-to-preview")}
        icon={
          <Ionicons name="chevron-back-circle" size={24} color={theme.text} />
        }
        onPress={handleStartWorkout}
        height={44}
      />
      <ActiveSessionAlert style={{ marginHorizontal: 16 }} />
      <OptionButton
        title={`${t("button.edit")} ${t("templates.template")}`}
        icon={
          <Ionicons
            name="create"
            size={24}
            color={activeSession ? theme.handle : theme.info}
          />
        }
        color={activeSession ? theme.handle : theme.info}
        onPress={handleEditTemplate}
        height={44}
        disabled={!!activeSession}
      />

      <OptionButton
        title={`${t("button.clone")} ${t("templates.template")}`}
        icon={<Ionicons name="duplicate" size={24} color={theme.accent} />}
        color={theme.accent}
        onPress={handleCloneTemplate}
        height={44}
      />

      <OptionButton
        title={`${t("templates.add-to-split")}`}
        icon={<Ionicons name="flash" size={24} color={theme.fifthBackground} />}
        color={theme.fifthBackground}
        onPress={handleAddToSplit}
        height={44}
      />

      <OptionButton
        title={`${t("button.delete")} ${t("templates.template")}`}
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
        {t("templates.options-info")}
      </Text>
    </Fragment>
  );
});
