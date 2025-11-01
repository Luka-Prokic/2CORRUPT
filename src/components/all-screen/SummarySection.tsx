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

// helper to check if a date is in the current week
function isThisWeek(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
}

export function SummarySection() {
  const { completedSessions } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const [limit, setLimit] = useState(20);

  const sessionsThisWeekFull = completedSessions.filter((s) =>
    isThisWeek(s.startTime)
  );

  const sessionsThisWeek = sessionsThisWeekFull.slice(0, limit);

  const showMoreButtonVisible = sessionsThisWeekFull.length >= limit;
  const showMore = () => setLimit(limit + 20);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <Animated.View entering={FadeIn} style={{ width: WIDTH, marginBottom: 16 }}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => router.replace("/sessions")}
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
          Week Summary
        </Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme.thirdBackground}
        />
      </TouchableOpacity>

      {/* FlatList */}
      <FlatList
        data={sessionsThisWeek}
        renderItem={({ item }) => (
          <OptionButton
            title={`${item.name} |  ${formatDate(
              item.startTime
            )} | ${formatTime(item.startTime)} - ${formatTime(item.endTime)}`}
            icon={
              <Ionicons name="reload-circle" size={24} color={theme.text} />
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
