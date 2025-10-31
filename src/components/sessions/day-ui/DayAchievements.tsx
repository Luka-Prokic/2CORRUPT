import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { WIDTH } from "../../../features/Dimensions";
import { useSettingsStore } from "../../../stores/settings";

export function DayAchievements() {
  const { theme } = useSettingsStore();
  return <Ionicons name="medal" size={WIDTH * 0.15} color={theme.handle} />;
}
