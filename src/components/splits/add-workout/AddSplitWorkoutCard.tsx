import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { StrobeButton } from "../../ui/buttons/StrobeButton";

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

  const selectedTotal = useMemo(
    () => selectedTemplates.filter((t) => t.id === template.id).length,
    [selectedTemplates.length, template.id]
  );

  return (
    <StrobeButton
      onPress={() => onSelect(template)}
      style={{
        height: 72,
        backgroundColor: theme.secondaryBackground,
      }}
      strobeDisabled={selectedTotal === 0}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        {/* Workout info */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {template.name}
          </Text>
        </View>

        {/* Selection button */}
        {selectedTotal > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Selected count pill */}
            <View
              style={{
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

            {/* Unselect button */}
            <TouchableOpacity
              onPress={() => unSelect(template)}
              style={{
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
          </View>
        )}
      </View>
    </StrobeButton>
  );
}
