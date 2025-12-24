import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { WeekRecapScreen } from "./WeekRecapScreen";
import { HEIGHT } from "../../utils/Dimensions";

interface WeekSummarySliderProps {
  weeks: Date[][];
  currentWeekIndex: number;
  setCurrentWeekIndex: (index: number) => void;
}

export function WeekSummarySlider({
  weeks,
  currentWeekIndex,
  setCurrentWeekIndex,
}: WeekSummarySliderProps) {
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / HEIGHT);
    if (weeks.length - 1 - index === currentWeekIndex) return;
    setCurrentWeekIndex(weeks.length - 1 - index);
  };

  const reversedWeeks = [...weeks].reverse();
  const initialScrollIndex = reversedWeeks.length - 1 - currentWeekIndex;

  return (
    <FlatList
      data={reversedWeeks}
      initialScrollIndex={initialScrollIndex}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
      getItemLayout={(_, index) => ({
        length: HEIGHT,
        offset: HEIGHT * index,
        index,
      })}
      renderItem={({ item }) => <WeekRecapScreen week={item} />}
    />
  );
}
