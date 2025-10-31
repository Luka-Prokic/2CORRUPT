import React, { useMemo } from "react";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useSessionsByDate } from "../../../features/workout";
import { useCategoryScoresForDay } from "../../../features/workout/useSessionHistory";
import { WIDTH } from "../../../features/Dimensions";

const CATEGORY_ICONS = {
  chest: "happy",
  shoulders: "bowling-ball",
  back: "pizza",
  legs: "sad",
  core: "fast-food",
  arms: "thumbs-up",
  "full-body": "contrast",
} as const;

type CategoryKey = keyof typeof CATEGORY_ICONS;
type IconName = (typeof CATEGORY_ICONS)[CategoryKey];

interface DayBadgeProps {
  date: Date;
  style?: ViewStyle | ViewStyle[];
}

export function DayBadge({ date, style }: DayBadgeProps) {
  const { theme } = useSettingsStore();
  const sessionsOnThisDate = useSessionsByDate(date);
  const categoryScores = useCategoryScoresForDay(date);

  const iconName = useMemo((): IconName | "rainy" | "ribbon" => {
    if (!sessionsOnThisDate.length) return "rainy";
    const firstCategory = categoryScores[0]?.category as
      | CategoryKey
      | undefined;
    return firstCategory && CATEGORY_ICONS[firstCategory]
      ? CATEGORY_ICONS[firstCategory]
      : "ribbon";
  }, [sessionsOnThisDate, categoryScores]);

  return (
    <Animated.View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Ionicons name={iconName} color={theme.handle} size={WIDTH * 0.15} />
    </Animated.View>
  );
}
