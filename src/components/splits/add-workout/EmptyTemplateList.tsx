import React from "react";
import { View, Text } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { TextButton } from "../../ui/buttons/TextButton";
import { BackgroundText } from "../../ui/text/BackgroundText";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { useWorkoutStore } from "../../../stores/workout";

export function EmptyTemplateList() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();

  function handlePressCreateTemplate() {
    router.dismissTo("/");
    setTypeOfView("template");
    editTemplate();
  }
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: theme.info,
          textAlign: "center",
        }}
      >
        {t("splits.no-templates-available")}
      </Text>

      <TextButton
        title={`+ ${t("splits.create-template-button")}`}
        onPress={handlePressCreateTemplate}
        style={{
          marginTop: 8,
        }}
      />
      <BackgroundText
        text={t("splits.create-template-info")}
        style={{ textAlign: "justify" }}
      />
      <TextButton
        title={t("splits.go-to-summary")}
        onPress={() => router.replace("/sessions")}
        style={{
          marginTop: 8,
        }}
      />
    </View>
  );
}
