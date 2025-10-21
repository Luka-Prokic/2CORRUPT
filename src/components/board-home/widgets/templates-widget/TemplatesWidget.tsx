import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { useWorkoutStore } from "../../../../stores/workout";
import { router } from "expo-router";
import { useUIStore } from "../../../../stores/ui";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { TemplateCard } from "./cards/TemplateCard";
import { CardSlider } from "../../../ui/CardSlider";
import { TemplatesHeader } from "./TemplatesHeader";

export function TemplatesWidget() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();
  const { templates } = useWorkoutStore();

  const { widgetUnit } = useWidgetUnit();

  const cardWidth = widgetUnit * 0.8;
  const cardHeight = widgetUnit - 84;

  function onAddTemplate() {
    router.back();
    setTypeOfView("template");
    editTemplate();
  }

  function handleWidgetPress() {
    router.push("/templates");
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        borderRadius: 32,
        padding: 4,
        borderWidth: 1,
        backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
        borderColor: theme.border,
        width: widgetUnit,
        height: widgetUnit,
      }}
    >
      <TemplatesHeader />

      <CardSlider
        data={templates}
        card={({ item }) => <TemplateCard template={item} />}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        styleSlider={{ width: widgetUnit - 10, height: cardHeight }}
        styleDots={{
          width: cardWidth,
          alignItems: "center",
          height: 32,
          position: "absolute",
          bottom: 10,
        }}
      />

      {/* New Template Button */}
      <BounceButton
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: theme.tint,
        }}
        onPress={onAddTemplate}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color={theme.background} />
      </BounceButton>
    </TouchableOpacity>
  );
}
