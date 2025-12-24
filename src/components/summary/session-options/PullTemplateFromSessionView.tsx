import { forwardRef, Fragment, useState } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { useTranslation } from "react-i18next";
import { TempInput } from "../../ui/input/TempInput";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useKeyboardHeight } from "../../../features/ui/useKeyboardHeight";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface PullTemplateFromSessionViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
  closeOnCancel?: boolean;
}

export const PullTemplateFromSessionView = forwardRef<
  BottomSheetModal,
  PullTemplateFromSessionViewProps
>(({ session, setView, closeOnCancel = false }, ref) => {
  const { editTemplate, confirmTemplate, updateTemplateField } =
    useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [tempName, setTempName] = useState(session?.name || "");
  const bottomSpace = useKeyboardHeight(16);

  const itsNotReady = !tempName;

  function closeSheet() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  const handlePullTemplate = () => {
    const templateId = editTemplate();

    const newLayout = session.layout.map((ex) => ({
      ...ex,
      sets: ex.sets.map((set) => ({
        ...set,
        isCompleted: false,
      })),
    }));

    updateTemplateField(templateId, "layout", newLayout);
    updateTemplateField(templateId, "name", tempName);
    updateTemplateField(templateId, "description", session.notes);
    confirmTemplate();

    closeSheet();
  };

  const handleCancel = () => {
    if (closeOnCancel)
      (ref as React.RefObject<BottomSheetModal>)?.current?.close();
    else setView("options");
  };

  return (
    <Fragment>
      <TempInput
        tempName={tempName}
        setTempName={setTempName}
        styleView={{
          marginTop: 16,
          marginBottom: bottomSpace,
        }}
      />
      <TwoOptionStrobeButtons
        labelOne={t("button.cancel")}
        labelTwo={t("button.add")}
        onOptionOne={handleCancel}
        onOptionTwo={handlePullTemplate}
        styleTwo={{ backgroundColor: theme.accent }}
        styleLabelTwo={{ color: theme.secondaryText }}
        disabledTwo={itsNotReady}
      />
      <DescriptionText
        text={t("sessions.add-template-info")}
        style={{ marginVertical: 16 }}
      />
    </Fragment>
  );
});
