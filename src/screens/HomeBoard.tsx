import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { WIDTH } from "../features/Dimensions";
import { useSettingsStore } from "../stores/settingsStore";
import { AwardsWidget } from "../components/board-home/mockups/AwardsWidget";
import { StreakCounterWidget } from "../components/board-home/mockups/StreakCounterWidget";
import { ProfileWidget } from "../components/board-home/widgets/profile-widget/ProfileWidget";
import { TemplateWidget } from "../components/board-home/mockups/TemplateWidget";
import { StatsWidget } from "../components/board-home/mockups/StatsWidget";
import { ActiveSplitWidget } from "../components/board-home/mockups/ActiveSplitWidget";
import { AllButtonWidget } from "../components/board-home/mockups/AllButtonWidget";
import { WorkoutStreakWidget } from "../components/board-home/mockups/WorkoutStreakWidget";
import { CalendarWidget } from "../components/board-home/widgets/calendar-widget/CalendarWidget";
import { hexToRGBA } from "../features/HEXtoRGB";

const widgetSize = (WIDTH - 40) / 2; // 2 columns with padding

export function HomeBoard() {
  const { theme } = useSettingsStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {/* semi-mock */}
        <ProfileWidget />

        {/* full-mock */}
        <AwardsWidget />

        {/* semi-mock */}
        <CalendarWidget
          onDateChange={(dateLabel, dateObj) => {
            console.log("Selected:", dateLabel, dateObj);
          }}
          sharedSelectedDate={selectedDate}
          onSharedDateChange={(date) => setSelectedDate(date)}
        />

        {/* mock */}
        <StreakCounterWidget
          style={{
            ...styles.widget,
            width: widgetSize,
            height: widgetSize,
            backgroundColor: "transparent",
          }}
          streak={7}
          maxStreak={30}
          variant="detailed"
        />

        <TemplateWidget />

        <View
          style={{
            width: widgetSize,
            height: widgetSize,
            marginBottom: 8,
          }}
        >
          {/* full-mock */}
          <ActiveSplitWidget
            style={{
              ...styles.lilWidget,
              width: widgetSize,
              height: (widgetSize - 8) / 2,
              marginBottom: 8,
              backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: (widgetSize - 8) / 2,
            }}
          >
            {/* not-mock */}
            <AllButtonWidget />
            {/* mock */}
            <WorkoutStreakWidget
              style={{
                ...styles.lilWidget,
                width: (widgetSize - 8) / 2,
                height: (widgetSize - 8) / 2,
                marginBottom: 0,
                marginLeft: 4,
                backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
              }}
            />
          </View>
        </View>

        {/* ful-mock */}
        <StatsWidget
          style={{ ...styles.widget, width: widgetSize, height: widgetSize }}
        />
      </View>
    </ScrollView>
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
