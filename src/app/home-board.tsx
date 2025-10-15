import { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { WIDTH } from "../features/Dimensions";
import { useSettingsStore } from "../stores/settingsStore";
import { AwardsWidget } from "../components/board-home/mockups/AwardsWidget";
import { ProfileWidget } from "../components/board-home/widgets/profile-widget/ProfileWidget";
import { TemplateWidget } from "../components/board-home/mockups/TemplateWidget";
import { BlankWidget } from "../components/board-home/mockups/BlankWidget";
import { AllButtonWidget } from "../components/board-home/mockups/AllButtonWidget";
import { CalendarWidget } from "../components/board-home/widgets/calendar-widget/CalendarWidget";
import { hexToRGBA } from "../features/HEXtoRGB";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { BackButtonWidget } from "../components/board-home/mockups/BackButtonWidget";

const widgetSize = (WIDTH - 40) / 2; // 2 columns with padding

export default function HomeBoard() {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();

  return (
    <Fragment>
      <Stack.Screen options={{}} />

      <ScreenContent
        edges={["top", "bottom"]}
        scroll={true}
        style={{ backgroundColor: theme.background }}
      >
        <View
          style={[
            styles.grid,
            { paddingTop: insets.top, paddingHorizontal: 16 },
          ]}
        >
          {/* semi-mock */}
          <ProfileWidget />

          {/* full-mock */}
          <AwardsWidget />

          <BlankWidget
            style={{
              ...styles.lilWidget,
              width: widgetSize,
              height: widgetSize,
              borderRadius: 28,
              backgroundColor: hexToRGBA(theme.fourthBackground, 0.4),
            }}
          />

          <TemplateWidget />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: (widgetSize - 8) / 2,
              marginBottom: 8,
              gap: 8,
            }}
          >
            <BackButtonWidget />
            <AllButtonWidget />
          </View>

          <BlankWidget
            style={{
              ...styles.lilWidget,
              width: widgetSize,
              height: (widgetSize - 8) / 2,
              borderRadius: 28,
              backgroundColor: hexToRGBA(theme.fourthBackground, 0.4),
            }}
          />
          {/* semi-mock */}
          <CalendarWidget
            onDateChange={(dateLabel, dateObj) => {
              console.log("Selected:", dateLabel, dateObj);
            }}
          />
        </View>
      </ScreenContent>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  widget: {
    marginBottom: 8,
  },
  lilWidget: {
    marginBottom: 8,
    borderRadius: 24,
  },
  fullWidth: {
    width: "100%",
  },
  compactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  miniRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  achievementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
});
