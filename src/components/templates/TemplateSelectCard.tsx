import { WorkoutTemplate } from "../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { Fragment, useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TemplateBottomSheet } from "../board-home/widgets/templates-widget/template-options/TemplateBottomSheet";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";

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

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

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
  const presentModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <Fragment>
      <TouchableOpacity
        style={{
          height: widgetUnit,
          width: widgetUnit,
          backgroundColor: isSelected ? theme.text : theme.fifthBackground,
          borderColor: theme.border,
          borderRadius: 32,
          padding: 10,
          borderWidth: 1,
          gap: 4,
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
          {template.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: theme.border,
          }}
          adjustsFontSizeToFit
          numberOfLines={3}
          minimumFontScale={0.5}
        >
          {tags}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: theme.secondaryText,
          }}
        >
          {template.layout?.length} exercises
        </Text>
        {selectMode ? (
          isSelected ? (
            <Ionicons name="checkbox" size={44} color={theme.text} />
          ) : (
            <Ionicons name="square-outline" size={44} color={theme.text} />
          )
        ) : null}
      </TouchableOpacity>
      <TemplateBottomSheet template={template} ref={bottomSheetRef} />
    </Fragment>
  );
}
