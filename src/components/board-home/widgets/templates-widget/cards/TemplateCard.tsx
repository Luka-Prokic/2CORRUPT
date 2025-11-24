import { WorkoutTemplate } from "../../../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { Fragment, useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TemplateBottomSheet } from "../../../../templates/template-options/TemplateBottomSheet";
import { AddToSplitBottomSheet } from "../../../../templates/split-options/AddToSplitBottomSheet";
import { useTranslation } from "react-i18next";

interface TemplateCardProps {
  template: WorkoutTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const templateBottomSheetRef = useRef<BottomSheetModal>(null);
  const addToSplitBottomSheetRef = useRef<BottomSheetModal>(null);

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

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
          backgroundColor: theme.fifthBackground,
          borderColor: theme.border,
          borderRadius: 16,
          borderWidth: 1,
        }}
        onPress={handlePresentModalPress}
        activeOpacity={0.7}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.secondaryBackground,
          }}
          numberOfLines={2}
        >
          {template.name} v{template.version}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: theme.secondaryText,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {tags}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: theme.thirdBackground,
            alignSelf: "flex-end",
          }}
        >
          {template.layout?.length}{" "}
          {template.layout?.length > 1
            ? t("templates.exercises")
            : t("templates.exercise")}
        </Text>
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
