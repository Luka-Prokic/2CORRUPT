import { Text, TouchableOpacity } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export function SplitsWidget() {
  const { widgetUnit, halfWidget } = useWidgetUnit();
  const { theme } = useSettingsStore();

  function handleWidgetPress() {
    router.push("/splits");
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        width: widgetUnit,
        height: halfWidget,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: theme.border,
        padding: 12,
        marginBottom: 8,
        alignItems: "center",
        flexDirection: "row",
        gap: 16,
      }}
    >
      <Ionicons name="bandage-outline" size={44} color={theme.text} />
      <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
        Splits
      </Text>
    </TouchableOpacity>
  );
}
