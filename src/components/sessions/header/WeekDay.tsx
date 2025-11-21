import { TouchableOpacity } from "react-native";
import { useCalendarNavigation } from "../../../features/test/useCalendarNavigation";
import { useSessionsByDate } from "../../../features/workout";
import { Text } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useDayLabels } from "../../../features/Labels";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";

interface WeekDayProps {
  date: Date;
  dayIndex: number;
  size: number;
  onDayPress: (date: Date, dayIndex: number) => void;
  selectedDate: Date; // currently selected day
  currentWeek: Date[];
}
export function WeekDay({
  date,
  dayIndex,
  size,
  onDayPress,
  selectedDate,
  currentWeek,
}: WeekDayProps) {
  const { theme } = useSettingsStore();
  const { isFutureDate, isToday } = useCalendarNavigation();
  const dayLabels = useDayLabels();
  const isFuture = isFutureDate(date);
  const isTodayDate = isToday(date);
  const isDone = useSessionsByDate(date).length ? true : false;

  const selectedIndexInWeek = currentWeek.findIndex(
    (d) => d.toDateString() === selectedDate.toDateString()
  );

  const isSelected = dayIndex === selectedIndexInWeek;

  return (
    <TouchableOpacity
      key={`day-${dayIndex}-${date.toDateString()}`}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        zIndex: 2,
        width: size,
        height: size,
      }}
      onPress={() => onDayPress(date, dayIndex)}
      disabled={isFuture}
      activeOpacity={0.7}
    >
      {isDone && !isSelected ? (
        <Ionicons
          name="checkmark-circle"
          color={theme.fifthBackground}
          size={size}
        />
      ) : (
        <Fragment>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 2,
              color: isFuture
                ? theme.handle
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
                ? theme.handle
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
        </Fragment>
      )}
    </TouchableOpacity>
  );
}
