import { forwardRef, Fragment, useState } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { Text } from "react-native";
import { WIDTH } from "../../../utils/Dimensions";
import { View } from "react-native";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";
import { TempInput } from "../../ui/input/TempInput";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface UpdateTemplateViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
  closeOnCancel?: boolean;
}

export const UpdateTemplateView = forwardRef<
  BottomSheetModal,
  UpdateTemplateViewProps
>(({ session, setView, closeOnCancel = false }, ref) => {
  const { editTemplate, confirmTemplate, updateTemplateField } =
    useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [tempName, setTempName] = useState(session?.name || "");

  const itsNotReady = !tempName;

  const handlePullTemplate = () => {
    const templateId = editTemplate(session.templateId);

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
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  };

  const handleCancel = () => {
    if (closeOnCancel)
      (ref as React.RefObject<BottomSheetModal>)?.current?.close();
    else setView("options");
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
      <View
        style={{
          width: WIDTH - 32,
          height: 68,
          paddingVertical: 2,
          flexDirection: "row",
          gap: 8,
        }}
      >
        <BounceButton
          style={{
            width: WIDTH / 2 - 20,
            height: 64,
            backgroundColor: theme.handle,
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            overflow: "hidden",
          }}
          onPress={handleCancel}
        >
          <StrobeBlur
            tint="light"
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
            >
              {t("button.cancel")}
            </Text>
          </StrobeBlur>
        </BounceButton>
        <BounceButton
          style={{
            width: WIDTH / 2 - 20,
            height: 64,
            backgroundColor: theme.tint,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            overflow: "hidden",
          }}
          onPress={handlePullTemplate}
          disabled={itsNotReady}
        >
          <StrobeBlur
            colors={[
              theme.caka,
              theme.primaryBackground,
              theme.accent,
              theme.tint,
            ]}
            tint={itsNotReady ? "dark" : "light"}
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
            >
              {t("button.sync")}
            </Text>
          </StrobeBlur>
        </BounceButton>
      </View>
      <DescriptionText
        text={t("sessions.update-template-info")}
        style={{ marginVertical: 16 }}
      />
    </Fragment>
  );
});
