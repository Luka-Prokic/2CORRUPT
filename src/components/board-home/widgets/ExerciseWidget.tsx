import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { router } from "expo-router";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { Shine } from "../../ui/misc/Shine";
import { IText } from "../../ui/text/IText";

export function ExerciseWidget() {
  const { theme } = useSettingsStore();
  const { fullWidth, halfWidget } = useWidgetUnit();

  function handlePress() {
    router.push("/exercise/list");
  }

  return (
    <BounceButton
      style={{
        width: fullWidth,
        height: halfWidget,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdAccent, 0.6),
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdAccent, 0.4),
      }}
      onPress={handlePress}
      title="Exercise (mock)"
      haptics
    >
      <Shine />
      <Ionicons name="barbell-outline" size={44} color={theme.text} />
      <IText text="Exercise (mock)" color={theme.text} />
    </BounceButton>
  );
}
