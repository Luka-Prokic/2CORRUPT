import { useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { useWorkoutStore } from "../../stores/workout";
import { useSettingsStore } from "../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { OptionButton } from "../ui/buttons/OptionButton";
import { FlatListFooterButton } from "../ui/buttons/FlatListFooterButtons";
import Animated, { FadeIn } from "react-native-reanimated";
import { hexToRGBA } from "../../features/HEXtoRGB";

export function ExercisesSection() {
  const { exercises } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const [limit, setLimit] = useState(20);

  const exercisesLimited = exercises.slice(0, limit);
  const showMoreButtonVisible = exercises.length >= limit;
  const showMore = () => setLimit(limit + 20);

  return (
    <Animated.View entering={FadeIn} style={{ width: WIDTH, marginBottom: 16 }}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => {}}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          height: 44,
          backgroundColor: hexToRGBA(theme.accent, 0.2),
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.accent }}>
          Exercises
        </Text>
        <Ionicons name="chevron-forward" size={24} color={theme.accent} />
      </TouchableOpacity>

      {/* FlatList */}
      <FlatList
        data={exercisesLimited}
        renderItem={({ item }) => (
          <OptionButton
            title={item.defaultName}
            icon={
              <Ionicons
                name="information-circle"
                size={24}
                color={theme.info}
              />
            }
            color={theme.info}
            height={44}
          />
        )}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 4 }}
        ListFooterComponent={
          showMoreButtonVisible && (
            <FlatListFooterButton onPress={showMore} title="Show more" />
          )
        }
      />
    </Animated.View>
  );
}
