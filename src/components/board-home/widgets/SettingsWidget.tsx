import React from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export function SettingsWidget() {
  const { theme } = useSettingsStore();
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
        router.push("/settings/main");
      }}
    >
      <Ionicons name="cog-outline" size={44} color={theme.grayText} />
    </BounceButton>
  );
}
