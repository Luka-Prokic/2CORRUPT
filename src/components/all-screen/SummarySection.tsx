import { Text, TouchableOpacity } from "react-native";
import { WIDTH } from "../../utils/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { WorkoutsThisWeek } from "./WorkoutsThisWeek";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SummarySection() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  function handlePress() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Animated.View entering={FadeIn} style={{ width: WIDTH, marginBottom: 16 }}>
      {/* Header */}
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          height: 44,
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.2),
          paddingHorizontal: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.thirdBackground,
          }}
        >
          {isExpanded
            ? t("all.hide-workouts-this-week")
            : t("all.show-workouts-this-week")}
        </Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.thirdBackground}
        />
      </TouchableOpacity>

      {isExpanded && <WorkoutsThisWeek />}
    </Animated.View>
  );
}
