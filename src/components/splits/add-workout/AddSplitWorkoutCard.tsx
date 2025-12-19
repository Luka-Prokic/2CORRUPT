import { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { StrobeButton, StrobeButtonProps } from "../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { InfoText } from "../../ui/text/InfoText";

interface AddSplitWorkoutCardProps extends StrobeButtonProps {
  template: WorkoutTemplate;
  onSelect: (template: WorkoutTemplate) => void;
  unSelect: (template: WorkoutTemplate) => void;
  selectedTemplates: WorkoutTemplate[];
}

export function AddSplitWorkoutCard({
  template,
  onSelect,
  unSelect,
  selectedTemplates,
  ...props
}: AddSplitWorkoutCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  const selectedTotal = useMemo(
    () => selectedTemplates.filter((t) => t.id === template.id).length,
    [selectedTemplates, template.id]
  );

  function handlePress() {
    onSelect(template);
  }

  const isSelected = selectedTotal > 0;

  return (
    <StrobeButton
      onPress={handlePress}
      {...props}
      style={{
        height: widgetUnit,
        width: widgetUnit,
        backgroundColor: theme.secondaryAccent,
        borderColor: theme.secondaryAccent + "40",
        borderWidth: 1,
        borderRadius: 32,
      }}
      styleContent={{
        padding: 16,
        justifyContent: "space-between",
        backgroundColor: isSelected ? theme.caka + "40" : "",
      }}
      strobeDisabled={!isSelected}
    >
      <MidText
        text={`${template.name} v${template.version}`}
        color={theme.secondaryBackground}
        align="left"
        weight="bold"
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ width: widgetUnit - 32 }}
      />

      <DescriptionText
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

      {/* Selected count pill */}
      {selectedTotal > 0 && (
        <View
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            backgroundColor: hexToRGBA(theme.handle, 0.8),
            padding: 8,
            minWidth: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            {selectedTotal}x
          </Text>
        </View>
      )}

      {/* Unselect button */}
      {selectedTotal > 0 && (
        <TouchableOpacity
          onPress={() => unSelect(template)}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            backgroundColor: hexToRGBA(theme.handle, 0.8),
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
      )}
    </StrobeButton>
  );
}
