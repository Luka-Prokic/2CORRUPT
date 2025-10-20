import React from "react";
import { Text } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { router } from "expo-router";

export function AllButtonWidget() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { halfWidget } = useWidgetUnit();

  return (
    <BounceButton
      style={{
        width: halfWidget,
        height: halfWidget,
        backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.border,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        router.push("/all");
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.text,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {t("app.all")}
      </Text>
    </BounceButton>
  );
}
