import React from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { IButton } from "../../ui/buttons/IButton";
import { hexToRGBA } from "../../../features/HEXtoRGB";

export function BackButtonWidget() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { halfWidget } = useWidgetUnit();

  return (
    <IButton
      style={{
        width: halfWidget,
        height: halfWidget,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        router.back();
      }}
    >
      <Ionicons name="chevron-back-circle" size={64} color={theme.text} />
    </IButton>
  );
}
