import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { SplitPlan, useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { hexToRGBA } from "../../../features/HEXtoRGB";

interface AddSplitDayCardProps {
  split: SplitPlan;
  style?: ViewStyle | ViewStyle[];
}

export function AddSplitDayCard({ split, style }: AddSplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { addDayToSplit } = useWorkoutStore();
  const [isRest, setIsRest] = useState<boolean>(false);

  function handleAddDay() {
    addDayToSplit(split.id);
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        padding: 16,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.5),
        borderColor: theme.border,
        borderRadius: 32,
        borderWidth: 1,
        ...style,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Ionicons name="add" size={64} color={theme.text} />
      </View>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "center" }}
        onPress={handleAddDay}
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
              flex: 1,
              color: theme.handle,
            }}
            numberOfLines={1}
          >
            Day {(split.split.length || 0) + 1}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
