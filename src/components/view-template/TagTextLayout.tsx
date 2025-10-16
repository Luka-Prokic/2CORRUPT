import React, { Fragment, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";

const mockTags = [
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

export function TagTextLayout({ tags = mockTags }: { tags?: string[] }) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({});

  const handleToggle = (tag: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  return (
    <Fragment>
      <Text
        style={{
          color: theme.grayText,
          fontWeight: "400",
          fontSize: 16,
          textAlign: "center",
          marginHorizontal: 16,
        }}
      >
        {t("template-view.add-tags")}
      </Text>
      s
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
                color: selectedTags[tag] ? theme.accent : theme.handle,
                fontWeight: "bold",
                fontSize: 32,
                letterSpacing: -0.5,
                fontFamily: "Anton-Regular",
              }}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Fragment>
  );
}
