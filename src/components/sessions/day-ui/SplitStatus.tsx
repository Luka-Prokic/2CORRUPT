import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../features/Dimensions";

export function SplitStatus() {
  const { theme } = useSettingsStore();
  return <Ionicons name="flash" size={WIDTH * 0.15} color={theme.handle} />;
}
