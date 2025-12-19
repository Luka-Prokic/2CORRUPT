import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { hexToRGBA } from "../../../../utils/HEXtoRGB";
import { useWorkoutStore } from "../../../../stores/workout";
import { router } from "expo-router";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { TemplateCard } from "./cards/TemplateCard";
import { CardSlider } from "../../../ui/sliders/CardSlider";
import { TemplatesHeader } from "./TemplatesHeader";
import { EmptyTemplateCard } from "./cards/EmptyTemplateCard";
import { TemplatesFooter } from "./TemplatesFooter";
import { Shine } from "../../../ui/misc/Shine";

export function TemplatesWidget() {
  const { theme } = useSettingsStore();
  const { templates } = useWorkoutStore();

  const { widgetUnit } = useWidgetUnit();

  const cardWidth = widgetUnit * 0.8;
  const cardHeight = widgetUnit - 84;

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
        backgroundColor: hexToRGBA(theme.thirdAccent, 0.6),
        borderColor: hexToRGBA(theme.thirdAccent, 0.4),
        width: widgetUnit,
        height: widgetUnit,
      }}
    >
      <Shine />

      <TemplatesHeader />

      <CardSlider
        data={templates}
        card={({ item }) => <TemplateCard template={item} />}
        emptyCard={<EmptyTemplateCard />}
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

      <TemplatesFooter />
    </TouchableOpacity>
  );
}
