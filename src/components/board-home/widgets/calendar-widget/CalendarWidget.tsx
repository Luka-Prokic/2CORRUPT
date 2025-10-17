import React, { useState, useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { WIDTH } from "../../../../features/Dimensions";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { CalendarList } from "./CalendarList";
import { DayPicker } from "../../../sessions/DayPicker";

interface CalendarWidgetProps {
  onDateChange?: (dateLabel: string, dateObj?: Date) => void;
  navigateToDate?: Date;
}

export function CalendarWidget({
  onDateChange,
  navigateToDate,
}: CalendarWidgetProps) {
  const { theme } = useSettingsStore();
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { fullWidth } = useWidgetUnit();

  const animatedTranslateX = useRef(new Animated.Value(0)).current;
  const buttonWidth = useRef(0);

  // Calculate the start of the week (Monday)
  const getWeekStart = (date: Date): Date => {
    const newDate = new Date(date); // Create a copy to avoid mutating original
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    newDate.setDate(diff);
    return newDate;
  };

  // Generate week dates
  const generateWeek = (startDate: Date): Date[] => {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      week.push(date);
    }
    return week;
  };

  // Initialize current week to today
  useEffect(() => {
    const today = new Date();
    const weekStart = getWeekStart(new Date(today));
    const week = generateWeek(weekStart);
    setCurrentWeek(week);

    // Find today's index in the week and select it
    const todayIndex = week.findIndex(
      (date) => date.toDateString() === today.toDateString()
    );
    if (todayIndex !== -1) {
      setSelectedIndex(todayIndex);
      setSelectedDate(today);
    }
  }, []);

  // Handle external navigation
  useEffect(() => {
    if (navigateToDate) {
      const weekStart = getWeekStart(new Date(navigateToDate));
      const week = generateWeek(weekStart);
      setCurrentWeek(week);

      const dateIndex = week.findIndex(
        (date: any) => date.toDateString() === navigateToDate.toDateString()
      );
      if (dateIndex !== -1) {
        setSelectedIndex(dateIndex);
        setSelectedDate(navigateToDate);
      }
    }
    // Removed automatic reset to today - let user navigate freely
  }, [navigateToDate]);

  // Animate background position
  useEffect(() => {
    Animated.spring(animatedTranslateX, {
      toValue: selectedIndex * buttonWidth.current,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [selectedIndex]);

  // Navigate to previous week
  const navigateToPreviousWeek = () => {
    if (!currentWeek[0]) return;

    const newWeekStart = new Date(currentWeek[0]);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    const newWeek = generateWeek(newWeekStart);
    setCurrentWeek(newWeek);

    // Select the last day (Sunday) of the previous week
    setSelectedIndex(6); // Sunday is index 6
    setSelectedDate(newWeek[6]);

    // Notify parent components
    if (onDateChange) {
      const dateLabel = newWeek[6].toLocaleDateString();
      onDateChange(dateLabel, newWeek[6]);
    }
  };

  // Navigate to next week (only if not in future)
  const navigateToNextWeek = () => {
    if (!currentWeek[0]) return;

    const newWeekStart = new Date(currentWeek[0]);
    newWeekStart.setDate(newWeekStart.getDate() + 7);

    // Check if the new week is in the future
    const today = new Date();
    // today.setHours(0, 0, 0, 0);

    // If the new week starts after today, don't navigate
    if (newWeekStart > today) {
      return;
    }

    const newWeek = generateWeek(newWeekStart);
    setCurrentWeek(newWeek);

    // Check if today is in the new week
    const todayIndex = newWeek.findIndex(
      (date: any) => date.toDateString() === today.toDateString()
    );

    let selectedIndex = 0; // Default to first day (Monday)
    let selectedDate = newWeek[0];

    if (todayIndex !== -1) {
      // If today is in this week, select today
      selectedIndex = todayIndex;
      selectedDate = newWeek[todayIndex];
    }

    setSelectedIndex(selectedIndex);
    setSelectedDate(selectedDate);

    // Notify parent components
    if (onDateChange) {
      const dateLabel = selectedDate.toLocaleDateString();
      onDateChange(dateLabel, selectedDate);
    }
  };

  // Handle day selection
  const handleDayPress = (date: Date, index: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);

    // Disable future dates
    if (selectedDay > today) {
      return;
    }

    // Don't update if the same date is already selected
    if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
      return;
    }

    // Check if the selected date is in the current week
    const isInCurrentWeek = currentWeek.some(
      (weekDate) => weekDate.toDateString() === date.toDateString()
    );

    if (!isInCurrentWeek) {
      // Date is not in current week, navigate to the week containing this date
      const weekStart = getWeekStart(new Date(date));
      const week = generateWeek(weekStart);
      setCurrentWeek(week);

      // Find the index of the selected date in the new week
      const newIndex = week.findIndex(
        (weekDate) => weekDate.toDateString() === date.toDateString()
      );
      setSelectedIndex(newIndex);
    } else {
      // Date is in current week, just update the index
      setSelectedIndex(index);
    }

    setSelectedDate(date);

    // Notify parent components
    if (onDateChange) {
      const dateLabel = date.toLocaleDateString();
      onDateChange(dateLabel, date);
    }
  };

  // Check if date is in the future
  const isFutureDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Animated background style
  const animatedBackgroundStyle = {
    transform: [{ translateX: animatedTranslateX }],
  };

  // Calculate button width
  const calculateButtonWidth = () => {
    const totalPadding = 48; // 16px padding on each side
    const availableWidth = WIDTH - totalPadding;
    return availableWidth / 7;
  };

  const buttonSize = calculateButtonWidth();
  buttonWidth.current = buttonSize;

  // Check if next week navigation should be disabled
  const isNextWeekDisabled = () => {
    if (!currentWeek[0]) return true;

    const nextWeekStart = new Date(currentWeek[0]);
    nextWeekStart.setDate(currentWeek[0].getDate() + 7);

    const today = new Date();

    return nextWeekStart > today;
  };

  return (
    <View
      style={{
        borderRadius: 32,
        marginBottom: 8,
        backgroundColor: hexToRGBA(theme.fourthBackground, 0.4),
        padding: 8,
        borderWidth: 1,
        borderColor: theme.border,
        width: fullWidth,
      }}
    >
      <DayPicker
        currentWeek={currentWeek}
        selectedIndex={selectedIndex}
        buttonSize={buttonSize}
        animatedBackgroundStyle={animatedBackgroundStyle}
        onDayPress={handleDayPress}
        onPreviousWeek={navigateToPreviousWeek}
        onNextWeek={navigateToNextWeek}
        isNextWeekDisabled={isNextWeekDisabled}
        isFutureDate={isFutureDate}
        isToday={isToday}
      />

      {/* Selected Day Card */}
      <CalendarList selectedDate={selectedDate} />
    </View>
  );
}
