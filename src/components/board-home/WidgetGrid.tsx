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
import { CalendarLilWidget } from "./widgets/calendar-widget/CalendarLilWidget";
import { SplitsWidget } from "./widgets/splits-widget/SplitsWidget";
import { SummaryWidget } from "./widgets/summary-widget/SummaryWidget";

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

      {/* <CalendarLilWidget /> */}
      <SummaryWidget />

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

      <SplitsWidget />

      <BlankWidget
        style={{
          width: WIDGET_SIZE * 2 + 8,
          height: WIDGET_SIZE,
          borderRadius: 32,
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        }}
      />
    </View>
  );
}
