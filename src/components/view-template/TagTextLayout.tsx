import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../features/Dimensions";

export function TagTextLayout({ tags }: { tags: string[] }) {
  const { theme } = useSettingsStore();
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
        left: 16,
        right: 16,
        width: WIDTH - 32,
        gap: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {tags.map((tag, index) => (
          <TouchableOpacity key={tag} onPress={() => handleToggle(tag)}>
            <Text
              style={{
                color: selectedTags[tag] ? theme.accent : theme.handle,
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              {tag}
              {/* Add comma except after the last tag */}
              {index < tags.length - 1 && (
                <Text
                  style={{
                    color: theme.handle,
                    fontWeight: "bold",
                    fontSize: 28,
                  }}
                >
                  {", "}
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={{
          color: theme.grayText,
          fontWeight: "400",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        Tap to add tags that describe your template.
      </Text>
    </View>
  );
}
