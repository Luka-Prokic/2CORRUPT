import { forwardRef, Fragment } from "react";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { Text, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";

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
    setView("first");
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
            backgroundColor: theme.error,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            overflow: "hidden",
          }}
          onPress={handleDeleteTemplate}
        >
          <StrobeBlur
            colors={[
              theme.caka,
              theme.primaryBackground,
              theme.accent,
              theme.tint,
            ]}
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
            >
              {t("button.delete")}
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
        {t("templates.delete-info")}
      </Text>
    </Fragment>
  );
});
