import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";

export function CalendarLilWidget() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();

  function handleWidgetPress() {
    router.push("/sessions");
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        borderRadius: 32,
        marginBottom: 8,
        backgroundColor: hexToRGBA(theme.text, 0.8),
        padding: 8,
        borderWidth: 1,
        borderColor: theme.border,
        width: widgetUnit,
        height: widgetUnit,
      }}
    ></TouchableOpacity>
  );
}
