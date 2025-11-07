import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileWidget } from "./widgets/profile-widget/ProfileWidget";
import { AwardsWidget } from "./mockups/AwardsWidget";
import { BlankWidget } from "./mockups/BlankWidget";
import { WIDTH } from "../../features/Dimensions";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { BackButtonWidget } from "./mockups/BackButtonWidget";
import { AllButtonWidget } from "./mockups/AllButtonWidget";
import { TemplateWidget } from "./mockups/TemplateWidget";
import { useSettingsStore } from "../../stores/settings";

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
      {/* semi-mock */}
      <ProfileWidget />

      {/* full-mock */}
      <AwardsWidget />

      <BlankWidget
        style={{
          width: WIDGET_SIZE,
          height: WIDGET_SIZE,
          borderRadius: 28,
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.4),
          marginBottom: 8,
        }}
      />

      <TemplateWidget />

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
        <AllButtonWidget />
      </View>

      <BlankWidget
        style={{
          width: WIDGET_SIZE,
          height: (WIDGET_SIZE - 8) / 2,
          borderRadius: 28,
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.4),
        }}
      />

      <BlankWidget
        style={{
          width: WIDGET_SIZE * 2 + 8,
          height: WIDGET_SIZE,
          borderRadius: 28,
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.4),
        }}
      />
    </View>
  );
}
