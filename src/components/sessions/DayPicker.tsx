import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useDayLabels } from "../../features/Labels";
import { WIDTH } from "../../features/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DayPickerProps {
  currentWeek: Date[];
  weeks: Date[][]; // all weeks
  currentWeekIndex: number; // visible week index
  selectedDate: Date; // currently selected day
  buttonSize: number;
  animatedBackgroundStyle: any;
  onDayPress: (date: Date, dayIndex: number) => void;
  setCurrentWeekIndex: (index: number) => void; // to handle swipe
  isFutureDate: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
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
  isFutureDate,
  isToday,
}: DayPickerProps) {
  const { theme } = useSettingsStore();
  const dayLabels = useDayLabels();
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const handleWeekScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / WIDTH);
    if (newIndex !== currentWeekIndex) setCurrentWeekIndex(newIndex);
  };

  const selectedIndexInWeek = currentWeek.findIndex(
    (d) => d.toDateString() === selectedDate.toDateString()
  );

  
  return (
    <View
      style={{
        width: WIDTH,
        marginTop: insets.top,
      }}
    >
      {/* Animated selected day circle */}
      <Animated.View
        style={[
          {
            position: "absolute",
            borderRadius: 50,
            width: buttonSize,
            height: buttonSize,
            backgroundColor: theme.accent,
          },
          animatedBackgroundStyle,
        ]}
      />
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
            {week.map((date: Date, dayIndex: number) => {
              const isSelected = dayIndex === selectedIndexInWeek;
              const isFuture = isFutureDate(date);
              const isTodayDate = isToday(date);

              return (
                <TouchableOpacity
                  key={`day-${dayIndex}-${date.toDateString()}`}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                    zIndex: 2,
                    width: buttonSize,
                    height: buttonSize,
                  }}
                  onPress={() => onDayPress(date, dayIndex)}
                  disabled={isFuture}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 2,
                      color: isFuture
                        ? theme.grayText
                        : isSelected
                        ? theme.background
                        : isTodayDate
                        ? theme.accent
                        : theme.text,
                      fontWeight: isTodayDate ? "bold" : "normal",
                    }}
                  >
                    {dayLabels[dayIndex]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: isFuture
                        ? theme.grayText
                        : isSelected
                        ? theme.background
                        : isTodayDate
                        ? theme.accent
                        : theme.text,
                      fontWeight: isSelected || isTodayDate ? "bold" : "normal",
                    }}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}
