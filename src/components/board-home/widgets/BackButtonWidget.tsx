import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BounceButton } from "../../ui/buttons/BounceButton";

export function BackButtonWidget() {
  const { theme } = useSettingsStore();
  const { halfWidget } = useWidgetUnit();

  return (
    <BounceButton
      style={{
        width: halfWidget,
        height: halfWidget,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
      onPress={() => {
        router.dismissTo("/");
      }}
    >
      <Ionicons name="chevron-back-circle" size={64} color={theme.text} />
    </BounceButton>
  );
}
