import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";
import { WeekDay } from "./WeekDay";
import { getDayIndex } from "../../../features/calendar/useDate";
import { useUIStore } from "../../../stores/ui/useUIStore";

export function DayPicker() {
  const { theme } = useSettingsStore();
  const { selectedDate, currentWeekIndex, setCurrentWeekIndex, weeks } =
    useUIStore();
  const flatListRef = useRef<FlatList>(null);

  const animatedTranslateX = useRef(new Animated.Value(0)).current;

  const animatedBackgroundStyle = useMemo(
    () => ({ transform: [{ translateX: animatedTranslateX }] }),
    [animatedTranslateX]
  );

  // Animate selected day circle
  useEffect(() => {
    Animated.spring(animatedTranslateX, {
      toValue: (getDayIndex(selectedDate) * WIDTH) / 7,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [selectedDate]);

  const handleWeekScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / WIDTH);
    if (newIndex !== currentWeekIndex) setCurrentWeekIndex(newIndex);
  };

  return (
    <View
      style={{
        width: WIDTH,
        height: WIDTH / 7,
      }}
    >
      {/* Animated selected day circle */}
      <Animated.View
        style={[
          {
            position: "absolute",
            borderRadius: "50%",
            width: WIDTH / 7,
            height: WIDTH / 7,
            backgroundColor: theme.tint,
          },
          animatedBackgroundStyle,
        ]}
      />
      {/* Week Days*/}
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={weeks}
        keyExtractor={(_, index) => `week-${index}`}
        showsHorizontalScrollIndicator={false}
        onScroll={handleWeekScroll}
        scrollEventThrottle={16}
        initialScrollIndex={currentWeekIndex}
        getItemLayout={(_, index) => ({
          length: WIDTH,
          offset: WIDTH * index,
          index,
        })}
        renderItem={({ item: week }) => (
          <View
            style={{
              height: WIDTH / 7,
              width: WIDTH,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            {week.map((date: Date, dayIndex: number) => (
              <WeekDay key={`week-day-${dayIndex}`} date={date} />
            ))}
          </View>
        )}
      />
    </View>
  );
}
