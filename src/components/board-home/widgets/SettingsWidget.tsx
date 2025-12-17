import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Shine } from "../../ui/misc/Shine";

export function SettingsWidget() {
  const { theme } = useSettingsStore();
  const { halfWidget } = useWidgetUnit();

  return (
    <BounceButton
      style={{
        width: halfWidget,
        height: halfWidget,
        backgroundColor: hexToRGBA(theme.thirdAccent, 0.6),
        borderRadius: 32,
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdAccent, 0.4),
      }}
      onPress={() => {
        router.push("/settings/main");
      }}
      haptics
    >
      <Shine
        style={{
          width: halfWidget,
          height: halfWidget,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="cog-outline" size={44} color={theme.info} />
      </Shine>
    </BounceButton>
  );
}
