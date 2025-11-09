import React from "react";
import { View, Text } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { useTranslation } from "react-i18next";

export function NoSearchMatchTempaltes() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <Text
      style={{
        fontSize: 22,
        fontWeight: "600",
        color: theme.grayText,
        textAlign: "center",
      }}
    >
      {t("templates.no-templates-found-match")}
    </Text>
  );
}
