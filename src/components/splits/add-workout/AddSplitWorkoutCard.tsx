import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { StrobeButton, StrobeButtonProps } from "../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";

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

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

  const selectedTotal = useMemo(
    () => selectedTemplates.filter((t) => t.id === template.id).length,
    [selectedTemplates, template.id]
  );

  return (
    <StrobeButton
      onPress={() => onSelect(template)}
      {...props}
      style={{
        height: widgetUnit,
        width: widgetUnit,
        backgroundColor: theme.fifthBackground,
        borderColor: theme.fifthBackground + "40",
        borderWidth: 1,
        borderRadius: 32,
      }}
      strobeDisabled={selectedTotal === 0}
    >
      <View
        style={{
          height: widgetUnit,
          width: widgetUnit,
          padding: 16,
          justifyContent: "space-between",
        }}
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
            color: theme.thirdBackground,
            alignSelf: "flex-end",
          }}
        >
          {template.layout?.length}{" "}
          {template.layout?.length > 1
            ? t("templates.exercises")
            : t("templates.exercise")}
        </Text>

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
      </View>
    </StrobeButton>
  );
}
