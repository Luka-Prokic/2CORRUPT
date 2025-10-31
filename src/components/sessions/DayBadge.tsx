import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settings";
import { useSessionsByDate } from "../../features/workout";
import { ViewStyle } from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { useCategoryScoresForDay } from "../../features/workout/useSessionHistory";

type IconName = (typeof CATEGORY_ICONS)[keyof typeof CATEGORY_ICONS];

const CATEGORY_ICONS = {
  chest: "happy",
  shoulders: "bowling-ball",
  back: "pizza",
  legs: "sad",
  core: "fast-food",
  arms: "thumbs-up",
  "full-body": "contrast",
} as const;

interface DayBadgeProps {
  date: Date;
  style?: ViewStyle | ViewStyle[];
}

export function DayBadge({ date, style }: DayBadgeProps) {
  const { theme } = useSettingsStore();
  const sessionsOnThisDate = useSessionsByDate(date);
  const cat = useCategoryScoresForDay(date);

  function getIconForCategory(category: string): IconName {
    return (CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] ??
      "ribbon") as IconName;
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        ...style,
      }}
    >
      <Ionicons
        name={
          sessionsOnThisDate.length
            ? getIconForCategory(cat[0].category)
            : "rainy"
        }
        color={theme.handle}
        size={WIDTH * 0.9}
      />
    </Animated.View>
  );
}
