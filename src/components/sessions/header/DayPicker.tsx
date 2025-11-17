import React, { useRef } from "react";
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

interface DayPickerProps {
  currentWeek: Date[];
  weeks: Date[][]; // all weeks
  currentWeekIndex: number; // visible week index
  selectedDate: Date; // currently selected day
  buttonSize: number;
  animatedBackgroundStyle: any;
  onDayPress: (date: Date, dayIndex: number) => void;
  setCurrentWeekIndex: (index: number) => void; // to handle swipe
}

export function DayPicker({
  currentWeek,
  weeks,
  currentWeekIndex,
  selectedDate,
  buttonSize,
  animatedBackgroundStyle,
  onDayPress,
  setCurrentWeekIndex,
}: DayPickerProps) {
  const { theme } = useSettingsStore();
  const flatListRef = useRef<FlatList>(null);

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
            width: buttonSize,
            height: buttonSize,
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
              height: buttonSize,
              width: WIDTH,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            {week.map((date: Date, dayIndex: number) => (
              <WeekDay
                key={`week-day-${dayIndex}`}
                date={date}
                dayIndex={dayIndex}
                size={buttonSize}
                onDayPress={onDayPress}
                selectedDate={selectedDate}
                currentWeek={currentWeek}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
}
