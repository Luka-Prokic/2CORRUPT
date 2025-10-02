import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import hexToRGBA from "../../hooks/HEXtoRGB";
import StrobeBlur from "../../components/ui/misc/StrobeBlur";
import BounceButton from "../ui/buttons/BounceButton";

const { width: screenWidth } = Dimensions.get("window");
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const { width } = Dimensions.get("window");
const widgetSize = width - 32;

interface CalendarWidgetProps {
  onDateChange?: (dateLabel: string, dateObj?: Date) => void;
  navigateToDate?: Date;
  sharedSelectedDate?: Date;
  onSharedDateChange?: (date: Date) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  onDateChange,
  navigateToDate,
  sharedSelectedDate,
  onSharedDateChange,
}) => {
  const { theme } = useThemeStore();
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dayData, setDayData] = useState<any>(null); // Will store workout/rest day data

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

  // Sync with shared selected date
  useEffect(() => {
    if (sharedSelectedDate) {
      const dateIndex = currentWeek.findIndex(
        (date: any) => date.toDateString() === sharedSelectedDate.toDateString()
      );

      if (dateIndex !== -1) {
        // Date is in current week, just update selection
        setSelectedIndex(dateIndex);
        setSelectedDate(sharedSelectedDate);
      } else {
        // Date is not in current week, navigate to the correct week
        const weekStart = getWeekStart(new Date(sharedSelectedDate));
        const week = generateWeek(weekStart);
        setCurrentWeek(week);

        const newDateIndex = week.findIndex(
          (date: any) =>
            date.toDateString() === sharedSelectedDate.toDateString()
        );
        if (newDateIndex !== -1) {
          setSelectedIndex(newDateIndex);
          setSelectedDate(sharedSelectedDate);
        }
      }
    }
  }, [sharedSelectedDate]);

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
    setDayData(getDayData(newWeek[6]));

    // Notify parent components
    if (onDateChange) {
      const dateLabel = newWeek[6].toLocaleDateString();
      onDateChange(dateLabel, newWeek[6]);
    }

    if (onSharedDateChange) {
      onSharedDateChange(newWeek[6]);
    }
  };

  // Navigate to next week (only if not in future)
  const navigateToNextWeek = () => {
    if (!currentWeek[0]) return;

    const newWeekStart = new Date(currentWeek[0]);
    newWeekStart.setDate(newWeekStart.getDate() + 7);

    // Check if the new week is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
    setDayData(getDayData(selectedDate));

    // Notify parent components
    if (onDateChange) {
      const dateLabel = selectedDate.toLocaleDateString();
      onDateChange(dateLabel, selectedDate);
    }

    if (onSharedDateChange) {
      onSharedDateChange(selectedDate);
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
    setDayData(getDayData(date));

    // Notify parent components
    if (onDateChange) {
      const dateLabel = date.toLocaleDateString();
      onDateChange(dateLabel, date);
    }

    if (onSharedDateChange) {
      onSharedDateChange(date);
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

  // Get day data (workout/rest day information)
  const getDayData = (date: Date) => {
    // This would typically fetch from your data store
    // For now, we'll simulate with some mock data
    const dayKey = date.toDateString();

    // Mock data - in real app this would come from your workout/calendar store
    const mockDayData: { [key: string]: any } = {
      // Add some example data for demonstration
    };

    // Check if date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate > today) {
      return { type: "future", title: "Future Date", icon: "time-outline" };
    }

    return (
      mockDayData[dayKey] || {
        type: "rest",
        title: "Rest Day",
        icon: "rainy-outline",
      }
    );
  };

  // Animated background style
  const animatedBackgroundStyle = {
    transform: [{ translateX: animatedTranslateX }],
  };

  // Calculate button width
  const calculateButtonWidth = () => {
    const totalPadding = 48; // 16px padding on each side
    const availableWidth = screenWidth - totalPadding;
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
    today.setHours(0, 0, 0, 0);

    return nextWeekStart > today;
  };

  return (
    <View
      style={{
        borderRadius: 32,
        marginBottom: 8,
        backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
        padding: 8,
        borderWidth: 1,
        borderColor: theme.border,
        width: widgetSize,
      }}
    >
      {/* Week Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          padding: 7,
        }}
      >
        <BounceButton
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.grayText,
          }}
          onPress={navigateToPreviousWeek}
        >
          <Ionicons name="chevron-back" size={20} color={theme.secondaryText} />
        </BounceButton>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
            color: theme.fifthBackground,
          }}
        >
          {currentWeek[0]
            ? currentWeek[0].toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Loading..."}
        </Text>

        <BounceButton
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.grayText,
            opacity: isNextWeekDisabled() ? 0.4 : 1,
          }}
          onPress={isNextWeekDisabled() ? undefined : navigateToNextWeek}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isNextWeekDisabled() ? theme.grayText : theme.secondaryText}
          />
        </BounceButton>
      </View>

      {/* Day Buttons */}
      {currentWeek.length > 0 && (
        <View
          key={`week-container-${currentWeek[0]?.toDateString()}`}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Animated Background */}
          <Animated.View
            key={`background-${currentWeek[0]?.toDateString()}`}
            style={[
              {
                position: "absolute",
                borderRadius: "50%",
                zIndex: 1,
                width: buttonSize,
                height: buttonSize,
                backgroundColor: theme.accent,
              },
              animatedBackgroundStyle,
            ]}
          />

          {/* Day Buttons */}
          {currentWeek.map((date: any, index: any) => {
            const isSelected = index === selectedIndex;
            const isFuture = isFutureDate(date);
            const isTodayDate = isToday(date);

            return (
              <TouchableOpacity
                key={`week-${currentWeek[0]?.toDateString()}-day-${date.toDateString()}-${index}`}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                  zIndex: 2,
                  paddingVertical: 8,
                  width: buttonSize,
                  height: buttonSize,
                }}
                onPress={() => handleDayPress(date, index)}
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
                  {DAY_LABELS[index]}
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

      {/* Selected Day Card */}
      {dayData && (
        <StrobeBlur
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: theme.border,
            height: 66,
          }}
          colors={[
            theme.caka,
            theme.primaryBackground,
            theme.accent,
            theme.tint,
          ]}
          duration={5000} // optional, default 4000ms
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Ionicons
                name={dayData.icon || "fitness"}
                size={32}
                color={
                  dayData.type === "future"
                    ? theme.grayText
                    : dayData.type === "rest"
                    ? theme.tabIconDefault
                    : theme.accent
                }
              />
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 4,
                  color: theme.text,
                }}
              >
                {dayData.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  color: theme.text,
                }}
              >
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>
          {dayData.type === "future" && (
            <Text
              style={{
                fontSize: 12,
                marginTop: 8,
                lineHeight: 16,
                opacity: 0.7,
                color: theme.grayText,
              }}
            >
              This date is in the future and cannot be selected
            </Text>
          )}
          {dayData.type !== "rest" &&
            dayData.type !== "future" &&
            dayData.description && (
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 8,
                  lineHeight: 16,
                  opacity: 0.7,
                  color: theme.grayText,
                }}
              >
                {dayData.description}
              </Text>
            )}
        </StrobeBlur>
      )}
    </View>
  );
};

export default CalendarWidget;
