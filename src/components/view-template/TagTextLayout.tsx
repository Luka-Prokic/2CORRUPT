import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkoutStore } from "../../stores/workout";

export const mockTags = [
  "Push",
  "Pull",
  "Legs",
  "Core",
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Glutes",
  "Hamstrings",
  "Quads",
  "Biceps",
  "Triceps",
  "Warmup",
  "Cooldown",
  "Strength",
  "Hypertrophy",
  "Endurance",
  "Mobility",
  "Power",
  "Cardio",
  "Accessory",
  "Full Body",
  "Isolation",
  "Compound",
  "HIIT",
  "Stretching",
  "Balance",
];

interface TagTextLayoutProps {
  tags?: string[];
  fontSize?: number;
}

export function TagTextLayout({
  tags = mockTags,
  fontSize = 32,
}: TagTextLayoutProps) {
  const { theme } = useSettingsStore();
  const { activeTemplate, updateTemplateField } = useWorkoutStore();

  const selectedTags = activeTemplate?.tags ?? [];

  const handleToggle = (tag: string) => {
    if (!activeTemplate) return;

    const isSelected = selectedTags.includes(tag);
    const newTags = isSelected
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    updateTemplateField(activeTemplate.id, "tags", newTags);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {tags.map((tag: string) => (
        <TouchableOpacity key={tag} onPress={() => handleToggle(tag)}>
          <Text
            style={{
              color: selectedTags.includes(tag) ? theme.tint : theme.handle,
              fontWeight: "bold",
              fontSize,
              letterSpacing: -0.5,
              fontFamily: "Anton-Regular",
            }}
          >
            {tag}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
