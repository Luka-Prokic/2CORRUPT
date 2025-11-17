import { useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { router } from "expo-router";
import { useWorkoutStore } from "../../stores/workout";
import { useSettingsStore } from "../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { OptionButton } from "../ui/buttons/OptionButton";
import { FlatListFooterButton } from "../ui/buttons/FlatListFooterButtons";
import Animated, { FadeIn } from "react-native-reanimated";
import { hexToRGBA } from "../../features/HEXtoRGB";

export function SplitsSection() {
  const { splitPlans } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const [limit, setLimit] = useState(20);

  const splitsLimited = splitPlans.slice(0, limit);
  const showMoreButtonVisible = splitPlans.length >= limit;
  const showMore = () => setLimit(limit + 20);

  return (
    <Animated.View entering={FadeIn} style={{ width: WIDTH, marginBottom: 16 }}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => router.replace("/splits/list")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          height: 44,
          backgroundColor: hexToRGBA(theme.fifthBackground, 0.2),
          paddingHorizontal: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.fifthBackground,
          }}
        >
          Splits
        </Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme.fifthBackground}
        />
      </TouchableOpacity>

      {/* FlatList */}
      <FlatList
        data={splitsLimited}
        renderItem={({ item }) => (
          <OptionButton
            title={item.name}
            icon={
              <Ionicons name="chevron-up-circle" size={24} color={theme.text} />
            }
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
