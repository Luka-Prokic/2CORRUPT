import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { MemoizedWeekRecapScreen } from "./WeekRecapScreen";
import { HEIGHT } from "../../utils/Dimensions";
import { useUIStore } from "../../stores/ui/useUIStore";
import { useMemo } from "react";

export function WeekSummarySlider() {
  const { weeks, currentWeekIndex, setCurrentWeekIndex } = useUIStore();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / HEIGHT);
    if (weeks.length - 1 - index === currentWeekIndex) return;
    setCurrentWeekIndex(weeks.length - 1 - index);
  };

  const reversedWeeks = useMemo(() => [...weeks].reverse(), [weeks]);

  return (
    <FlatList
      data={reversedWeeks}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
      getItemLayout={(_, index) => ({
        length: HEIGHT,
        offset: HEIGHT * index,
        index,
      })}
      renderItem={({ item }) => <MemoizedWeekRecapScreen week={item} />}
    />
  );
}
