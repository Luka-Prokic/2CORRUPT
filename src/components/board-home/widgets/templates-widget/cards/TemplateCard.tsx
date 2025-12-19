import { WorkoutTemplate } from "../../../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { Fragment, useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TemplateBottomSheet } from "../../../../templates/template-options/TemplateBottomSheet";
import { AddToSplitBottomSheet } from "../../../../templates/split-options/AddToSplitBottomSheet";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../../../ui/text/InfoText";
import { MidText } from "../../../../ui/text/MidText";

interface TemplateCardProps {
  template: WorkoutTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const templateBottomSheetRef = useRef<BottomSheetModal>(null);
  const addToSplitBottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    templateBottomSheetRef.current?.present();
  }, []);

  const handlePresentAddToSplitModal = useCallback(() => {
    templateBottomSheetRef.current?.dismiss();
    addToSplitBottomSheetRef.current?.present();
  }, []);

  return (
    <Fragment>
      <TouchableOpacity
        style={{
          padding: 8,
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: theme.secondaryAccent,
          borderColor: theme.secondaryAccent + "40",
          borderRadius: 16,
          borderWidth: 1,
        }}
        onPress={handlePresentModalPress}
        activeOpacity={0.7}
      >
        <MidText
          text={`${template.name} v${template.version}`}
          color={theme.secondaryBackground}
          align="left"
          weight="bold"
          numberOfLines={2}
          adjustsFontSizeToFit
          style={{ width: "100%" }}
        />
        <InfoText
          text={template.tags?.join(", ")}
          color={theme.secondaryText}
          align="left"
        />
        <InfoText
          text={`${template.layout?.length} ${
            template.layout?.length > 1
              ? t("templates.exercises")
              : t("templates.exercise")
          }`}
          color={theme.navBackground}
          align="right"
          style={{ width: "100%" }}
        />
      </TouchableOpacity>

      <TemplateBottomSheet
        template={template}
        ref={templateBottomSheetRef}
        startView="preview"
        onAddToSplit={handlePresentAddToSplitModal}
      />

      <AddToSplitBottomSheet
        templates={[template]}
        ref={addToSplitBottomSheetRef}
      />
    </Fragment>
  );
}
