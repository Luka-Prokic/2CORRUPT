import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { WeekDay } from "./WeekDay";
import { getDayIndex } from "../../../features/calendar/useDate";
import { useSettingsStore } from "../../../stores/settings";

interface WeekSliderProps {
  weeks: Date[][];
  currentWeekIndex: number;
  setCurrentWeekIndex: (index: number) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function WeekSlider({
  weeks,
  currentWeekIndex,
  setCurrentWeekIndex,
  selectedDate,
  setSelectedDate,
}: WeekSliderProps) {
  const { theme } = useSettingsStore();
  const [scrollLocked, setScrollLocked] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const animatedTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedTranslateX, {
      toValue: (getDayIndex(selectedDate) * WIDTH) / 7,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [selectedDate]);

  const animatedBackgroundStyle = useMemo(
    () => ({ transform: [{ translateX: animatedTranslateX }] }),
    [animatedTranslateX]
  );

  const handleWeekScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollLocked(true);
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / WIDTH);

    if (newIndex === currentWeekIndex) return;

    const week = weeks[newIndex];
    const today = new Date();

    // Normalize dates to YYYY-MM-DD to compare correctly
    const normalize = (d: Date) => d.toISOString().split("T")[0];
    const todayKey = normalize(today);

    // Check if week contains today
    const todayInWeek = week.some((d) => normalize(d) === todayKey);
    setCurrentWeekIndex(newIndex);

    if (todayInWeek) {
      setSelectedDate(today);
      setTimeout(() => {
        setScrollLocked(false);
      }, 0);
      return;
    }
    if (newIndex < currentWeekIndex) {
      setSelectedDate(week[6]);
      setTimeout(() => {
        setScrollLocked(false);
      }, 0);
      return;
    }
    setSelectedDate(week[0]);
    setTimeout(() => {
      setScrollLocked(false);
    }, 0);
    return;
  };

  useEffect(() => {
    if (scrollLocked) return;
    setScrollLocked(true);
    flatListRef.current.scrollToIndex({
      index: currentWeekIndex,
      animated: true,
    });
    setTimeout(() => {
      setScrollLocked(false);
    }, 0);
  }, [currentWeekIndex]);

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
