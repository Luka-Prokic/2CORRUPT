import { forwardRef, Fragment, useState } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { Text } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { View } from "react-native";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";
import { TempInput } from "../../ui/input/TempInput";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";

interface PullTemplateFromSessionViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
}

export const PullTemplateFromSessionView = forwardRef<
  BottomSheetModal,
  PullTemplateFromSessionViewProps
>(({ session, setView }, ref) => {
  const { editTemplate, confirmTemplate, updateTemplateField } =
    useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [tempName, setTempName] = useState(session?.name || "");

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
    setView("options");
  };

  const handleFocus = () => {
    (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(3);
  };

  const handleBlur = () => {
    (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(1);
  };

  return (
    <Fragment>
      <TempInput
        tempName={tempName}
        setTempName={setTempName}
        onFocus={handleFocus}
        onBlurCustom={handleBlur}
        styleView={{ marginVertical: 16 }}
      />
      <TwoOptionStrobeButtons
        labelOne={t("button.cancel")}
        labelTwo={t("button.add")}
        onOptionOne={handleCancel}
        onOptionTwo={handlePullTemplate}
        styleTwo={{ backgroundColor: theme.tint }}
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
        {t("sessions.add-template-info")}
      </Text>
    </Fragment>
  );
});
