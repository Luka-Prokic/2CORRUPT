import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WIDTH } from "../../utils/Dimensions";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { BackButtonWidget } from "./widgets/BackButtonWidget";
import { useSettingsStore } from "../../stores/settings";
import { SplitsWidget } from "./widgets/SplitsWidget";
import { SummaryWidget } from "./widgets/summary-widget/SummaryWidget";
import { TemplatesWidget } from "./widgets/templates-widget/TemplatesWidget";
import { SettingsWidget } from "./widgets/SettingsWidget";
import { BounceButton } from "../ui/buttons/BounceButton";
import { router } from "expo-router";
import { AwardsGif } from "./mockups/AwardsGif";

const WIDGET_SIZE = (WIDTH - 40) / 2; // 2 columns with padding

export function WidgetGrid() {
  const insets = useSafeAreaInsets();
  const { theme } = useSettingsStore();
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}
    >
      <BounceButton
        style={{
          width: WIDGET_SIZE,
          height: WIDGET_SIZE,
          borderRadius: 32,
          backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
          borderWidth: 1,
          borderColor: theme.border,
          marginBottom: 8,
        }}
        onPress={() => {
          router.push("/exercise/list");
        }}
        title="Exercise (mock)"
      />

      {/* full-mock */}
      <AwardsGif />

      <SummaryWidget />

      <TemplatesWidget />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: (WIDGET_SIZE - 8) / 2,
          marginBottom: 8,
          gap: 8,
        }}
      >
        <BackButtonWidget />
        <SettingsWidget />
      </View>

      <SplitsWidget />

      <View
        style={{
          width: WIDGET_SIZE * 2 + 8,
          height: WIDGET_SIZE,
          borderRadius: 32,
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
          borderWidth: 1,
          borderColor: hexToRGBA(theme.thirdBackground, 0.4),
        }}
      />
    </View>
  );
}
