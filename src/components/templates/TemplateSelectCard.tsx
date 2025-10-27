import { WorkoutTemplate } from "../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { Fragment, useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { TemplateBottomSheet } from "./template-options/TemplateBottomSheet";

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
          padding: 16,
          borderWidth: 1,
          justifyContent: "space-between",
        }}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {/* Top row: select checkbox */}
        {selectMode && (
          <Ionicons
            name={isSelected ? "checkbox" : "square-outline"}
            size={24}
            color={theme.text}
            style={{ alignSelf: "flex-end" }}
          />
        )}

        {/* Template name */}
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

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <Text
            style={{
              fontSize: 12,
              color: theme.secondaryText,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {template.tags.join(", ")}
          </Text>
        )}

        {/* Bottom: exercise count */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: theme.secondaryText,
            alignSelf: "flex-end",
          }}
        >
          {template.layout?.length} exercises
        </Text>
      </TouchableOpacity>

      <TemplateBottomSheet template={template} ref={bottomSheetRef} />
    </Fragment>
  );
}
