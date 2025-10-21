import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { useTranslation } from "react-i18next";

export function TemplatesHeader() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 34,
        width: widgetUnit,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
        {t("templates-widget.header")}
      </Text>
      <Ionicons name="chevron-forward" color={theme.accent} size={24} />
    </View>
  );
}
