import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import BackgroundTypeSelector from "./BackgroundTypeSelector";
import BackgroundColorSettings from "./BackgroundColorSettings";
import GridSettings from "./GridSettings";
import DotSettings from "./DotSettings";
import BackgroundActions from "./BackgroundActions";

export default function BackgroundSettings() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.accent,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        {t("settings.background")}
      </Text>

      <BackgroundTypeSelector />
      <BackgroundColorSettings />
      <GridSettings />
      <DotSettings />
      <BackgroundActions />
    </View>
  );
}
