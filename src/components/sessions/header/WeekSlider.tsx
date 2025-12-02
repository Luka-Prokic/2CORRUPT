import { useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { WeekDay } from "./WeekDay";
import { getDayIndex } from "../../../features/calendar/useDate";
import { useSettingsStore } from "../../../stores/settings";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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

  const flatListRef = useRef<FlatList>(null);
  const scrollLocked = useRef(false);

  // Start value based on selectedDate
  const translateX = useSharedValue((getDayIndex(selectedDate) * WIDTH) / 7);

  // Animated style for bubble
  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Animate bubble when selectedDate changes
  useEffect(() => {
    const dayIndex = getDayIndex(selectedDate);
    translateX.value = withSpring((dayIndex * WIDTH) / 7, {
      damping: 100,
      stiffness: 1000,
    });
  }, [selectedDate]);

  // Programmatic scroll when week changes
  useEffect(() => {
    if (scrollLocked.current) return;
    scrollLocked.current = true;

    flatListRef.current?.scrollToIndex({
      index: currentWeekIndex,
      animated: true,
    });

    setTimeout(() => {
      scrollLocked.current = false;
    }, 150);
  }, [currentWeekIndex]);

  const handleMomentumEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / WIDTH);

    if (newIndex === currentWeekIndex) return;

    const week = weeks[newIndex];
    const today = new Date();
    const norm = (d: Date) => d.toISOString().split("T")[0];

    setCurrentWeekIndex(newIndex);

    const todayInWeek = week.some((d) => norm(d) === norm(today));
    if (todayInWeek) {
      setSelectedDate(today);
      return;
    }

    if (newIndex < currentWeekIndex) {
      setSelectedDate(week[6]);
    } else {
      setSelectedDate(week[0]);
    }
  };

  return (
    <View style={{ marginTop: 8, width: WIDTH, height: WIDTH / 7 }}>
      {/* Animated bubble */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: WIDTH / 7,
            height: WIDTH / 7,
            borderRadius: WIDTH / 14,
            backgroundColor: theme.tint,
          },
          bubbleStyle,
        ]}
      />

      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={weeks}
        keyExtractor={(_, index) => `week-${index}`}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        initialScrollIndex={currentWeekIndex}
        getItemLayout={(_, index) => ({
          length: WIDTH,
          offset: WIDTH * index,
          index,
        })}
        renderItem={({ item: week }) => (
          <FlatList
            data={week}
            scrollEnabled={false}
            keyExtractor={(date) => date.toISOString()}
            contentContainerStyle={{
              height: WIDTH / 7,
              width: WIDTH,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            renderItem={({ item: date }) => <WeekDay date={date} />}
          />
        )}
      />
    </View>
  );
}
