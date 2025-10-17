import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Animated } from "react-native";
import { WIDTH } from "../Dimensions";
import { DAY_LABELS } from "../Labels";

export function useCalendarNavigation() {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [selectedDate, setSelectedDateState] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(0);

  const animatedTranslateX = useRef(new Animated.Value(0)).current;
  const buttonWidth = useRef(0);

  // Week starts Monday
  const getWeekStart = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - (day === 0 ? 6 : day - 1); // Monday
    newDate.setDate(diff);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  function generateWeek(startDate: Date) {
    return DAY_LABELS.map((_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  }

  function generateWeeks(numWeeksBefore = 4) {
    //TODO: add so it starts from users entry date
    const today = new Date();
    const currentWeekStart = getWeekStart(today);
    const allWeeks: Date[][] = [];

    for (let i = -numWeeksBefore; i <= 0; i++) {
      const start = new Date(currentWeekStart);
      start.setDate(start.getDate() + i * 7);
      allWeeks.push(generateWeek(start));
    }

    return allWeeks;
  }

  function getInitialWeekIndex(weeks: Date[][], today = new Date()): number {
    today.setHours(0, 0, 0, 0); // normalize

    const index = weeks.findIndex((week) =>
      week.some((d) => d.toDateString() === today.toDateString())
    );

    // fallback to last week if not found
    return index !== -1 ? index : weeks.length - 1;
  }

  useEffect(() => {
    const allWeeks = generateWeeks();
    setWeeks(allWeeks);

    const initialWeekIndex = getInitialWeekIndex(allWeeks);
    setCurrentWeekIndex(initialWeekIndex);

    // set selected date & index within that week
    const selectedWeek = allWeeks[initialWeekIndex];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayIndex = selectedWeek.findIndex(
      (d) => d.toDateString() === today.toDateString()
    );
    setSelectedIndex(dayIndex !== -1 ? dayIndex : 0);
    setSelectedDateState(today);
  }, []);

  // Animate selected day circle
  useEffect(() => {
    Animated.spring(animatedTranslateX, {
      toValue: selectedIndex * buttonWidth.current,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [selectedIndex]);

  const handleDayPress = (date: Date, index: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);

    if (selectedDay > today) return;
    if (selectedDate.toDateString() === date.toDateString()) return;

    setSelectedDateState(date);
    setSelectedIndex(index);

    // update currentWeekIndex if day pressed belongs to a different week
    const weekIdx = weeks.findIndex((week) =>
      week.some((d) => d.toDateString() === date.toDateString())
    );
    if (weekIdx !== -1 && weekIdx !== currentWeekIndex) {
      setCurrentWeekIndex(weekIdx);
    }
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  };

  const isToday = (date: Date) =>
    date.toDateString() === new Date().toDateString();

  const animatedBackgroundStyle = useMemo(
    () => ({ transform: [{ translateX: animatedTranslateX }] }),
    [animatedTranslateX]
  );

  const buttonSize = useMemo(() => WIDTH / 7, []);
  buttonWidth.current = buttonSize;

  function formatFriendlyDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isTodayDate = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formatted = date.toLocaleDateString("en-GB", options);

    if (isTodayDate) return `Today, ${formatted}`;
    if (isYesterday) return `Yesterday, ${formatted}`;

    const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
    return `${weekday}, ${formatted}`;
  }

  const dateTittle = formatFriendlyDate(selectedDate);

  useEffect(() => {
    const newWeek = weeks[currentWeekIndex];
    if (!newWeek || newWeek.length === 0) return;

    // Keep the same day index as before
    let newIndex = Math.min(selectedIndex, newWeek.length - 1);
    let newDate = newWeek[newIndex];

    // If the new date is in the future, pick today instead
    if (!isFutureDate(newDate)) {
      // it's fine, keep it
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // find today in this week
      const todayIndex = newWeek.findIndex(
        (d) => d.toDateString() === today.toDateString()
      );

      if (todayIndex !== -1) {
        newDate = today;
        newIndex = todayIndex;
      } else {
        // if today is not in this week, fallback to first non-future day
        const firstSelectableIndex = newWeek.findIndex((d) => !isFutureDate(d));
        if (firstSelectableIndex !== -1) {
          newDate = newWeek[firstSelectableIndex];
          newIndex = firstSelectableIndex;
        }
      }
    }

    // Update state only if needed
    if (newDate.toDateString() !== selectedDate.toDateString()) {
        setSelectedDateState(newDate);
      setSelectedIndex(newIndex);
    }
  }, [currentWeekIndex]);

  const setSelectedDate = useCallback(
    (date: Date) => {
      // find which week it belongs to
      const weekIndex = weeks.findIndex((week) =>
        week.some((d) => d.toDateString() === date.toDateString())
      );

      // find the index of that day inside that week
      const dayIndex =
        weekIndex !== -1
          ? weeks[weekIndex].findIndex(
              (d) => d.toDateString() === date.toDateString()
            )
          : -1;

      // trigger same behavior as normal press
      if (dayIndex !== -1) {
        handleDayPress(date, dayIndex);
        setCurrentWeekIndex(weekIndex);
      } else {
        // fallback: just set date directly if not found
        setSelectedDateState(date);
      }
    },
    [weeks, handleDayPress]
  );

  return {
    currentWeek: weeks[currentWeekIndex] || [],
    selectedDate,
    dateTittle,
    selectedIndex,
    buttonSize,
    animatedBackgroundStyle,
    handleDayPress,
    currentWeekIndex,
    setCurrentWeekIndex,
    setSelectedDate,
    isFutureDate,
    isToday,
    weeks,
  };
}
