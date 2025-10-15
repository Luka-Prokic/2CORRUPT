import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../features/Dimensions";
import { useTranslation } from "react-i18next";

export function TagTextLayout({ tags }: { tags: string[] }) {
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
    <View
      style={{
        position: "absolute",
        top: 16,
        left: 0,
        right: 0,
        width: WIDTH - 0,
        gap: 16,
      }}
    >
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
                fontFamily: "Anton-Regular"
              }}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    </View>
  );
}
