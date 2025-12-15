import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { BackButtonWidget } from "./widgets/BackButtonWidget";
import { useSettingsStore } from "../../stores/settings";
import { SplitsWidget } from "./widgets/SplitsWidget";
import { SummaryWidget } from "./widgets/summary-widget/SummaryWidget";
import { TemplatesWidget } from "./widgets/templates-widget/TemplatesWidget";
import { SettingsWidget } from "./widgets/SettingsWidget";
import { BounceButton } from "../ui/buttons/BounceButton";
import { router } from "expo-router";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ActionWidget } from "./widgets/action-widget/ActionWidget";

export function WidgetGrid() {
  const insets = useSafeAreaInsets();
  const { theme } = useSettingsStore();
  const { widgetUnit, halfWidget, fullWidth } = useWidgetUnit();

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        paddingTop: insets.top,
        gap: 8,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 8,
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <BounceButton
          style={{
            width: fullWidth,
            height: halfWidget,
            borderRadius: 32,
            backgroundColor: hexToRGBA(theme.thirdAccent, 0.6),
            borderWidth: 1,
            borderColor: hexToRGBA(theme.thirdAccent, 0.4),
          }}
          onPress={() => {
            router.push("/exercise/list");
          }}
          title="Exercise (mock)"
        />

        <SummaryWidget />

        <TemplatesWidget />

        <View
          style={{
            flexDirection: "row",
            height: halfWidget,
            gap: 8,
          }}
        >
          <BackButtonWidget />
          <SettingsWidget />
        </View>

        <SplitsWidget />
      </View>
      <ActionWidget />
    </Animated.View>
  );
}
