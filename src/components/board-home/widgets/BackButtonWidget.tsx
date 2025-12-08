import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { IButton } from "../../ui/buttons/IButton";

export function BackButtonWidget() {
  const { theme } = useSettingsStore();
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
        router.dismissTo("/");
      }}
    >
      <Ionicons name="chevron-back-circle" size={64} color={theme.text} />
    </IButton>
  );
}
