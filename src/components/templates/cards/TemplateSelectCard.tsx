import { WorkoutTemplate } from "../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Fragment, useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { TemplateBottomSheet } from "../template-options/TemplateBottomSheet";
import { AddToSplitBottomSheet } from "../split-options/AddToSplitBottomSheet";
import { useTranslation } from "react-i18next";

interface TemplateSelectCardProps {
  template: WorkoutTemplate;
  selectMode: boolean;
  onSelect: React.Dispatch<React.SetStateAction<WorkoutTemplate[]>>;
  selected: WorkoutTemplate[];
}

export function TemplateSelectCard({
  template,
  selectMode,
  onSelect,
  selected,
}: TemplateSelectCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  const templateBottomSheetRef = useRef<BottomSheetModal>(null);
  const addToSplitBottomSheetRef = useRef<BottomSheetModal>(null);

  const isSelected = selected.includes(template);

  function handlePress() {
    if (selectMode) {
      onSelect((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (t) => t.id === template.id
        );
        if (isAlreadySelected) {
          return prevSelected.filter((t) => t.id !== template.id);
        } else {
          return [...prevSelected, template];
        }
      });
    } else {
      presentModal();
    }
  }

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

  const presentModal = useCallback(() => {
    templateBottomSheetRef.current?.present();
  }, []);

  const presentAddToSplitModal = useCallback(() => {
    templateBottomSheetRef.current?.dismiss();
    addToSplitBottomSheetRef.current?.present();
  }, []);

  return (
    <Fragment>
      <TouchableOpacity
        style={{
          height: widgetUnit,
          width: widgetUnit,
          backgroundColor: isSelected ? theme.text : theme.fifthBackground,
          borderColor: isSelected
            ? theme.text + "40"
            : theme.fifthBackground + "40",
          borderRadius: 32,
          padding: 16,
          borderWidth: 1,
          justifyContent: "space-between",
        }}
        onPress={handlePress}
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

        {template.tags && template.tags.length > 0 && (
          <Text
            style={{
              fontSize: 14,
              color: theme.secondaryText,
            }}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {tags}
          </Text>
        )}

        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: theme.fifthAccent,
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
        onAddToSplit={presentAddToSplitModal}
        startView="preview"
      />

      <AddToSplitBottomSheet
        templates={[template]}
        ref={addToSplitBottomSheetRef}
      />
    </Fragment>
  );
}
