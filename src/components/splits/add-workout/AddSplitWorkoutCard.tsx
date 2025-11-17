import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

interface AddSplitWorkoutCardProps {
  template: WorkoutTemplate;
  onSelect: (template: WorkoutTemplate) => void;
  unSelect: (template: WorkoutTemplate) => void;
  selectedTemplates: WorkoutTemplate[];
  showTime?: boolean; // optional, if you later add a time field
}

export function AddSplitWorkoutCard({
  template,
  onSelect,
  unSelect,
  selectedTemplates,
  showTime = false,
}: AddSplitWorkoutCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();

  const selectedTotal = useMemo(
    () => selectedTemplates.filter((t) => t.id === template.id).length,
    [selectedTemplates.length, template.id]
  );

  return (
    <StrobeButton
      onPress={() => onSelect(template)}
      style={{
        height: widgetUnit,
        width: widgetUnit,
        backgroundColor: theme.fifthBackground,
        borderRadius: 32,
      }}
      strobeDisabled={selectedTotal === 0}
    >
      <View
        style={{
          height: widgetUnit,
          width: widgetUnit,
          padding: 16,
        }}
      >
        {/* Workout info */}
        <Text
          style={{
            color: theme.secondaryText,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {template.name}
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
