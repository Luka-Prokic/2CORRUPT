import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { DayRecapScreen } from "./DayRecapScreen";
import { useUIStore } from "../../stores/ui/useUIStore";

export function DaySliderScreen() {
  const { weeks, selectedDate, setSelectedDate, isExpanded } = useUIStore();
  const allDays = weeks?.flat() ?? [];

  // Guard against empty data — REQUIRED
  if (allDays.length === 0) {
    return null;
  }

  const flatListRef = useRef<FlatList<Date>>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const initialIndex = allDays.findIndex(
    (d) => d.toDateString() === selectedDate.toDateString()
  );

  const safeInitialIndex =
    typeof initialIndex === "number" && initialIndex >= 0 ? initialIndex : 0;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / WIDTH);

    if (index >= 0 && index < allDays.length) {
      setIsUserScrolling(true);
      const newDate = allDays[index];
      if (newDate.toDateString() !== selectedDate.toDateString()) {
        setSelectedDate(newDate);
      }
    }
  };

  useEffect(() => {
    if (!flatListRef.current || isUserScrolling) return;

    const index = allDays.findIndex(
      (d) => d.toDateString() === selectedDate.toDateString()
    );
    if (index >= 0) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isUserScrolling) {
      const timeout = setTimeout(() => setIsUserScrolling(false), 10);
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
      onMomentumScrollEnd={handleScroll}
      initialScrollIndex={safeInitialIndex}
      getItemLayout={(_, index) => ({
        length: WIDTH,
        offset: WIDTH * index,
        index,
      })}
      renderItem={({ item }) => <DayRecapScreen date={item} />}
      style={{
        borderBottomWidth: isExpanded ? 88 : 0,
        borderBottomColor: "red",
      }}
    />
  );
}
