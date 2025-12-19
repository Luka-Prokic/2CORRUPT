import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButtonWidget } from "./widgets/BackButtonWidget";
import { SplitsWidget } from "./widgets/splits-widget/SplitsWidget";
import { SummaryWidget } from "./widgets/summary-widget/SummaryWidget";
import { TemplatesWidget } from "./widgets/templates-widget/TemplatesWidget";
import { SettingsWidget } from "./widgets/SettingsWidget";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ActionWidget } from "./widgets/action-widget/ActionWidget";
import { ExerciseWidget } from "./widgets/ExerciseWidget";
import { AwardsWidget } from "./widgets/AwardsWidget";

export function WidgetGrid() {
  const insets = useSafeAreaInsets();
  const { halfWidget } = useWidgetUnit();

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
        <SummaryWidget />
        <AwardsWidget />
        <ExerciseWidget />
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
