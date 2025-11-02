import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { SplitPlan, SplitPlanDay, useWorkoutStore } from "../../stores/workout";
import { useSettingsStore } from "../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface SplitDayCardProps {
  split: SplitPlan;
  day: SplitPlanDay;
  index: number;
  style?: ViewStyle | ViewStyle[];
}

export function SplitDayCard({ split, day, index, style }: SplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { removeDayFromSplit } = useWorkoutStore();

  const handleToggleRest = () => {};

  function handleRemoveDay() {
    removeDayFromSplit(split.id, index);
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        padding: 16,
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: theme.primaryBackground,
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
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            flex: 1,
            color: day.isRest ? theme.info : theme.fifthBackground,
          }}
          numberOfLines={2}
        >
          Day {index + 1}
        </Text>

        {/* Rest toggle */}
        <TouchableOpacity onPress={handleToggleRest} hitSlop={10}>
          <Ionicons
            name={day.isRest ? "rainy" : "barbell"}
            size={34}
            color={day.isRest ? theme.info : theme.fifthBackground}
          />
        </TouchableOpacity>
        <Ionicons
          name="remove-circle"
          size={34}
          color={theme.error}
          onPress={handleRemoveDay}
        />
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: theme.info,
          }}
        >
          {day.isRest
            ? "Rest Day"
            : `${day.workouts.length} planned workout${
                day.workouts.length === 1 ? "" : "s"
              }`}
        </Text>
      </View>
    </Animated.View>
  );
}
