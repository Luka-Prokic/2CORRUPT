import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { WIDTH } from "../../../features/Dimensions";
import { useSettingsStore } from "../../../stores/settings";

export function WeeklyProgress() {
  const { theme } = useSettingsStore();
  return (
    <Ionicons name="speedometer" size={WIDTH * 0.15} color={theme.handle} />
  );
}
