import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useThemeStore } from "../stores/themeStore";

const { width } = Dimensions.get("window");
const widgetSize = (width - 40) / 2; // 2 columns with padding

export default function StashScreen() {
  const { theme } = useThemeStore();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}></View>
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
