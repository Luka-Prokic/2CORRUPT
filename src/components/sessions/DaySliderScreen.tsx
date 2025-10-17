import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, Text, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settingsStore";

interface DaySliderScreenProps {
  weeks: Date[][];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isFutureDate: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
}

export function DaySliderScreen({
  weeks,
  selectedDate,
  setSelectedDate,
  isFutureDate,
  isToday,
}: DaySliderScreenProps) {
  const allDays = weeks.flat();
  const flatListRef = useRef<FlatList<Date>>(null);
  const { theme } = useSettingsStore();

  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const initialIndex = allDays.findIndex(
    (d) => d.toDateString() === selectedDate.toDateString()
  );

  // When user swipes between days
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / WIDTH);

    // Avoid invalid index
    if (index >= 0 && index < allDays.length) {
      setIsUserScrolling(true);
      const newDate = allDays[index];
      if (newDate.toDateString() !== selectedDate.toDateString()) {
        setSelectedDate(newDate);
      }
    }
  };

  // Sync scroll position when selectedDate changes externally
  useEffect(() => {
    if (!flatListRef.current || isUserScrolling) return;

    const index = allDays.findIndex(
      (d) => d.toDateString() === selectedDate.toDateString()
    );
    if (index >= 0) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  }, [selectedDate]);

  // Reset scroll lock after a short delay
  useEffect(() => {
    if (isUserScrolling) {
      const timeout = setTimeout(() => setIsUserScrolling(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [isUserScrolling]);

  
  return (
    <FlatList
      ref={flatListRef}
      data={allDays}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll} // only trigger after scroll ends
      initialScrollIndex={Math.max(0, initialIndex)}
      getItemLayout={(_, index) => ({
        length: WIDTH,
        offset: WIDTH * index,
        index,
      })}
      renderItem={({ item }) => {
        const isFuture = isFutureDate(item);
        if (isFuture) return null;

        return (
          <View
            style={{
              width: WIDTH,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: isToday(item) ? theme.accent : theme.text,
              }}
            >
              {item.toDateString()}
            </Text>
          </View>
        );
      }}
    />
  );
}
