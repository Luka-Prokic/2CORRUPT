import { forwardRef, Fragment } from "react";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";

interface TemplateDeleteViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
}

export const TemplateDeleteView = forwardRef<
  BottomSheetModal,
  TemplateDeleteViewProps
>(({ template, setView }, ref) => {
  const { deleteTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function closeSheet() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  const handleDeleteTemplate = () => {
    deleteTemplate(template.id);
    closeSheet();
  };

  const handleCancel = () => {
    setView("options");
  };

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
        {t("button.delete")}{" "}
        <Text
          style={{
            color: theme.text,
            fontWeight: "bold",
          }}
        >
          {template.name}
        </Text>{" "}
        ?
      </Text>

      <TwoOptionStrobeButtons
        labelOne={t("button.cancel")}
        labelTwo={t("button.delete")}
        onOptionOne={handleCancel}
        onOptionTwo={handleDeleteTemplate}
        styleTwo={{ backgroundColor: theme.error }}
      />
      <Text
        style={{
          marginVertical: 16,
          color: theme.grayText,
          fontSize: 14,
          textAlign: "justify",
        }}
      >
        {t("templates.delete-info")}
      </Text>
    </Fragment>
  );
});
