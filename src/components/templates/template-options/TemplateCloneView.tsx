import { Fragment, useState } from "react";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { useTranslation } from "react-i18next";
import { TempInput } from "../../ui/input/TempInput";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useKeyboardHeight } from "../../../features/ui/useKeyboardHeight";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface TemplateCloneViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
  ref: React.RefObject<BottomSheetModal>;
}

export function TemplateCloneView({
  template,
  setView,
  ref,
}: TemplateCloneViewProps) {
  const { cloneTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [tempName, setTempName] = useState(template?.name || "");
  const bottomSpace = useKeyboardHeight(16);

  const itsNotReady = !tempName;

  function handleCloneTemplate() {
    cloneTemplate(template.id, tempName);
    ref.current?.close();
  }

  function handleCancel() {
    setView("options");
  }

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
      <DescriptionText
        text={t("templates.clone-info")}
        style={{ marginVertical: 16 }}
      />
    </Fragment>
  );
}
