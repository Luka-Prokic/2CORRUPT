import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { router } from "expo-router";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { Shine } from "../../ui/misc/Shine";

export function ExerciseWidget() {
  const { theme } = useSettingsStore();
  const { widgetUnit, halfWidget } = useWidgetUnit();

  function handlePress() {
    router.push("/exercise/list");
  }

  return (
    <BounceButton
      style={{
        width: widgetUnit,
        height: halfWidget,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdBackground, 0.4),
      }}
      onPress={handlePress}
      haptics
    >
      <Shine />
      <Ionicons
        name="barbell-outline"
        size={64}
        color={theme.thirdBackground}
      />
    </BounceButton>
  );
}
