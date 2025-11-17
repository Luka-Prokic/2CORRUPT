import { forwardRef, Fragment, useState } from "react";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { TempInput } from "../../ui/input/TempInput";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useKeyboardHeight } from "../../../features/ui/useKeyboardHeight";

interface TemplateCloneViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
}

export const TemplateCloneView = forwardRef<
  BottomSheetModal,
  TemplateCloneViewProps
>(({ template, setView }, ref) => {
  const { cloneTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [tempName, setTempName] = useState(template?.name || "");
  const bottomSpace = useKeyboardHeight(16);

  const itsNotReady = !tempName;

  function closeSheet() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  const handleCloneTemplate = () => {
    cloneTemplate(template.id, tempName);
    closeSheet();
  };

  const handleCancel = () => {
    setView("options");
  };

  return (
    <Fragment>
      <TempInput
        tempName={tempName}
        setTempName={setTempName}
        styleView={{ marginTop: 16, marginBottom: bottomSpace }}
      />
      <TwoOptionStrobeButtons
        labelOne={t("button.cancel")}
        labelTwo={t("button.clone")}
        onOptionOne={handleCancel}
        onOptionTwo={handleCloneTemplate}
        styleTwo={{ backgroundColor: theme.accent }}
        styleLabelTwo={{ color: theme.secondaryText }}
        disabledTwo={itsNotReady}
      />
      <Text
        style={{
          marginVertical: 16,
          color: theme.grayText,
          fontSize: 14,
          textAlign: "justify",
        }}
      >
        {t("templates.clone-info")}
      </Text>
    </Fragment>
  );
});
