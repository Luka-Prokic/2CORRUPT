import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  SplitPlan,
  SplitPlanDay,
  useWorkoutStore,
} from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { hexToRGBA } from "../../../features/HEXtoRGB";

interface SplitDayCardProps {
  split: SplitPlan;
  day: SplitPlanDay;
  index: number;
  style?: ViewStyle | ViewStyle[];
}

export function SplitDayCard({ split, day, index, style }: SplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { removeDayFromSplit, toggleDayRest } = useWorkoutStore();

  function handleRemoveDay() {
    removeDayFromSplit(split.id, index);
  }

  function handleToggleRest() {
    toggleDayRest(split.id, index);
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        padding: 16,
        justifyContent: "space-between",
        backgroundColor: day.isRest
          ? theme.primaryBackground
          : hexToRGBA(theme.thirdBackground, 1),
        borderColor: theme.border,
        borderRadius: 32,
        borderWidth: 1,
        ...style,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 34,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: day.isRest ? theme.info : theme.tint,
          }}
          numberOfLines={1}
        >
          Day {index + 1}
        </Text>

        <TouchableOpacity onPress={handleRemoveDay} hitSlop={10}>
          <Ionicons name="remove" size={34} color={theme.error} />
        </TouchableOpacity>
      </View>

      {/* Notes */}
      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          color: theme.info,
          marginTop: 6,
        }}
        numberOfLines={3}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
      >
        {day.notes}
      </Text>

      {/* Templates / workout list */}
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {day.workouts.slice(0, 3).map((template, index) => (
          <View
            key={index}
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 8,
              backgroundColor: theme.thirdBackground,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: theme.text,
              }}
            >
              {`Template ${index + 1}`}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer summary */}
      <View style={{}}>
        <TouchableOpacity
          onPress={handleToggleRest}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 34,
          }}
        >
          <Text
            style={{ fontSize: 12, color: theme.info }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {day.isRest ? "SET AS ACITVE" : "SET AS REST"}
          </Text>
          <Ionicons
            name={day.isRest ? "rainy" : "barbell"}
            size={34}
            color={day.isRest ? theme.info : theme.text}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
