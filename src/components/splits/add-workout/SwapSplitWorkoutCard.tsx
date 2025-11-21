import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { StrobeButton, StrobeButtonProps } from "../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

interface SwapSplitWorkoutCardProps extends StrobeButtonProps {
  template: WorkoutTemplate;
  onSelect: (template: WorkoutTemplate) => void;
  selectedTemplates: WorkoutTemplate[];
}

export function SwapSplitWorkoutCard({
  template,
  onSelect,
  selectedTemplates,
  ...props
}: SwapSplitWorkoutCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();

  const selectedTotal = useMemo(
    () => selectedTemplates.filter((t) => t.id === template.id).length,
    [template.id, selectedTemplates]
  );

  return (
    <StrobeButton
      onPress={() => onSelect(template)}
      {...props}
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

        {/* Swap icon */}
        {selectedTotal > 0 && (
          <View
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
            <Ionicons name="swap-horizontal" size={24} color={theme.text} />
          </View>
        )}
      </View>
    </StrobeButton>
  );
}
