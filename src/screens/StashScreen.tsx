import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import AwardsWidget from "../components/board-home/mockups/AwardsWidget";
import StreakCounterWidget from "../components/board-home/mockups/StreakCounterWidget";
import ProfileWidget from "../components/board-home/mockups/ProfileWidget";
import TemplateWidget from "../components/board-home/mockups/TemplateWidget";
import StatsWidget from "../components/board-home/mockups/StatsWidget";
import ActiveSplitWidget from "../components/board-home/mockups/ActiveSplitWidget";
import AllButtonWidget from "../components/board-home/mockups/AllButtonWidget";
import WorkoutStreakWidget from "../components/board-home/mockups/WorkoutStreakWidget";
import CalendarWidget from "../components/board-home/mockups/CalendarWidget";
import hexToRGBA from "../features/HEXtoRGB";

const { width } = Dimensions.get("window");
const widgetSize = (width - 40) / 2; // 2 columns with padding

export default function StashScreen() {
  const { theme } = useSettingsStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        <ProfileWidget
          style={{
            ...styles.widget,
            width: widgetSize,
            height: widgetSize,
            borderRadius: 44,
            backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
          }}
        />

        {/* Awards Widget */}
        <AwardsWidget size="large" />

        {/* Quote Card Widget - Full width */}
        <CalendarWidget
          onDateChange={(dateLabel, dateObj) => {
            console.log("Selected:", dateLabel, dateObj);
          }}
          sharedSelectedDate={selectedDate}
          onSharedDateChange={(date) => setSelectedDate(date)}
        />

        {/* Streak Counter Widget */}
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

        {/* Dashboard Layout - 3 widgets in 1x1 space */}
        <View
          style={{
            width: widgetSize,
            height: widgetSize,
            marginBottom: 8,
          }}
        >
          {/* Top Row - Active Split (full width, half height) */}
          <ActiveSplitWidget
            style={{
              ...styles.lilWidget,
              width: widgetSize,
              height: (widgetSize - 8) / 2, // Half height minus gap
              marginBottom: 4,
              backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
            }}
          />

          {/* Bottom Row - All Button & Streak (each half width, half height) */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: (widgetSize - 8) / 2, // Half height minus gap
            }}
          >
            <AllButtonWidget
              style={{
                ...styles.lilWidget,
                width: (widgetSize - 8) / 2, // Half width minus gap
                height: (widgetSize - 8) / 2, // Half height minus gap
                marginBottom: 0,
                marginRight: 4,
                backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
              }}
            />
            <WorkoutStreakWidget
              style={{
                ...styles.lilWidget,
                width: (widgetSize - 8) / 2, // Half width minus gap
                height: (widgetSize - 8) / 2, // Half height minus gap
                marginBottom: 0,
                marginLeft: 4,
                backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
              }}
            />
          </View>
        </View>

        {/* Stats Widget */}
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
