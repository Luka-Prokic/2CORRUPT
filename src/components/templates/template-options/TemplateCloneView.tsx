import { forwardRef, Fragment, useState } from "react";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { Text } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { View } from "react-native";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";
import { TempInput } from "../../ui/input/TempInput";

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

  const itsNotReady = !tempName;

  function closeSheet() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  const handleCloneTemplate = () => {
    cloneTemplate(template.id, tempName);
    closeSheet();
  };

  const handleCancel = () => {
    setView("first");
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
          onPress={handleCloneTemplate}
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
              {t("button.clone")}
            </Text>
          </StrobeBlur>
        </BounceButton>
      </View>
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
