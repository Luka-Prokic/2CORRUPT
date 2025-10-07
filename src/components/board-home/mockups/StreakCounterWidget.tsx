import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WidgetContainer } from "./WidgetContainer";
import { hexToRGBA } from "../../../features/HEXtoRGB";

interface StreakCounterWidgetProps {
  streak?: number;
  maxStreak?: number;
  style?: ViewStyle;
  variant?: "default" | "compact" | "detailed";
}

export function StreakCounterWidget({
  streak = 7,
  maxStreak = 30,
  style,
  variant = "default",
}: StreakCounterWidgetProps) {
  const { theme } = useSettingsStore();

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: styles.compactContainer,
          title: styles.compactTitle,
          number: styles.compactNumber,
          icon: styles.compactIcon,
        };
      case "detailed":
        return {
          container: styles.detailedContainer,
          title: styles.detailedTitle,
          number: styles.detailedNumber,
          icon: styles.detailedIcon,
        };
      default:
        return {
          container: styles.defaultContainer,
          title: styles.defaultTitle,
          number: styles.defaultNumber,
          icon: styles.defaultIcon,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const streakPercentage = Math.min(streak / maxStreak, 1);

  const getStreakColor = () => {
    if (streakPercentage >= 0.8) return theme.tint;
    if (streakPercentage >= 0.5) return theme.tint;
    return theme.accent;
  };

  const getStreakIcon = () => {
    if (streakPercentage >= 0.8) return "flame";
    if (streakPercentage >= 0.5) return "trending-up";
    return "time";
  };

  return (
    <WidgetContainer
      style={[
        style,
        variantStyles.container,
        { backgroundColor: hexToRGBA(theme.thirdBackground, 0.2) },
      ]}
      variant="inset"
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons
            name={getStreakIcon() as any}
            size={variant === "compact" ? 16 : variant === "detailed" ? 24 : 20}
            color={getStreakColor()}
            style={variantStyles.icon}
          />
          <Text
            style={[styles.title, { color: theme.text }, variantStyles.title]}
          >
            Streak
          </Text>
        </View>

        <View style={styles.streakContainer}>
          <Text
            style={[
              styles.number,
              { color: getStreakColor() },
              variantStyles.number,
            ]}
          >
            {streak}
          </Text>
          {variant === "detailed" && (
            <Text style={[styles.maxStreak, { color: theme.grayText }]}>
              / {maxStreak}
            </Text>
          )}
        </View>

        {variant !== "compact" && (
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressTrack, { backgroundColor: theme.border }]}
            >
              <View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: getStreakColor(),
                    width: `${streakPercentage * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        )}

        {variant === "detailed" && (
          <Text style={[styles.description, { color: theme.grayText }]}>
            {streak === 1 ? "day streak" : "days streak"}
          </Text>
        )}
      </View>
    </WidgetContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultContainer: {
    padding: 16,
  },
  compactContainer: {
    padding: 12,
  },
  detailedContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "600",
    marginLeft: 6,
  },
  defaultTitle: {
    fontSize: 14,
  },
  compactTitle: {
    fontSize: 12,
  },
  detailedTitle: {
    fontSize: 16,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  number: {
    fontWeight: "bold",
    fontSize: 24,
  },
  defaultNumber: {
    fontSize: 24,
  },
  compactNumber: {
    fontSize: 18,
  },
  detailedNumber: {
    fontSize: 32,
  },
  maxStreak: {
    fontSize: 16,
    marginLeft: 4,
  },
  progressContainer: {
    width: "100%",
    marginBottom: 4,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
  },
  defaultIcon: {},
  compactIcon: {
    marginRight: 4,
  },
  detailedIcon: {
    marginRight: 8,
  },
});
