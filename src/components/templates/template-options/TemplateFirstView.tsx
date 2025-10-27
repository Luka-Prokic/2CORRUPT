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

interface TemplateFirstViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
}

export const TemplateFirstView = forwardRef<
  BottomSheetModal,
  TemplateFirstViewProps
>(({ template, setView }, ref) => {
  const { startSession, editTemplate, activeSession } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t } = useTranslation();

  const closeSheet = () => {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  };

  const handleStartWorkout = () => {
    setTimeout(() => {
      startSession(template);
      setTypeOfView("workout");
      router.dismissTo("/");
    }, 200);

    closeSheet();
  };

  const handleEditTemplate = () => {
    setTimeout(() => {
      editTemplate(template.id);
      setTypeOfView("template");
      router.dismissTo("/");
    }, 200);
    closeSheet();
  };

  const handleCloneTemplate = () => {
    setView("clone");
  };

  const handleDeleteTemplate = () => {
    setView("delete");
  };

  const handleFocus = () => {
    (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(3);
  };

  const handleBlur = () => {
    (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(2);
  };

  return (
    <Fragment>
      <TemplateNameInput
        template={template}
        styleView={{ marginVertical: 16 }}
        onFocus={handleFocus}
        onBlurCustom={handleBlur}
      />
      {activeSession && (
        <Text
          style={{
            marginVertical: 4,
            color: theme.info,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          <Ionicons name="alert-circle" size={16} color={theme.error} />{" "}
          {t("templates.active-session-warning")}
        </Text>
      )}

      <OptionButton
        title={t("templates.start-workout")}
        icon={
          <Ionicons
            name="play"
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
        icon={<Ionicons name="duplicate" size={24} color={theme.text} />}
        onPress={handleCloneTemplate}
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
