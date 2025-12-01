import { TouchableOpacity } from "react-native";
import { useSessionsByDate } from "../../../features/workout";
import { Text } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useDayLabels } from "../../../features/Labels";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
import {
  getDayIndex,
  isFutureDate,
  isToday,
} from "../../../features/calendar/useDate";
import { useUIStore } from "../../../stores/ui/useUIStore";
import { WIDTH } from "../../../features/Dimensions";

interface WeekDayProps {
  date: Date;
}
export function WeekDay({ date }: WeekDayProps) {
  const { theme } = useSettingsStore();
  const dayLabels = useDayLabels();
  const isFuture = isFutureDate(date);
  const isTodayDate = isToday(date);
  const isDone = useSessionsByDate(date).length ? true : false;
  const { currentWeekIndex, setCurrentWeekIndex, selectedDate, weeks } =
    useUIStore();
  const dayIndex = getDayIndex(date);

  const selectedIndexInWeek = weeks[currentWeekIndex].findIndex(
    (d) => d.toDateString() === selectedDate.toDateString()
  );
  const isSelected = dayIndex === selectedIndexInWeek;

  const handleDayPress = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);

    if (selectedDay > today || !selectedDate) return;
    if (selectedDate?.toDateString() === date.toDateString()) return;

    // update currentWeekIndex if day pressed belongs to a different week
    const weekIdx = weeks.findIndex((week) =>
      week.some((d) => d.toDateString() === date.toDateString())
    );
    if (weekIdx !== -1 && weekIdx !== currentWeekIndex) {
      setCurrentWeekIndex(weekIdx);
    }
  };

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        zIndex: 2,
        width: WIDTH / 7,
        height: WIDTH / 7,
      }}
      onPress={() => handleDayPress(date)}
      disabled={isFuture}
      activeOpacity={0.7}
    >
      {isDone && !isSelected ? (
        <Ionicons
          name="checkmark-circle"
          color={theme.fifthBackground}
          size={WIDTH / 7}
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
            {dayIndex + 1}
          </Text>
        </Fragment>
      )}
    </TouchableOpacity>
  );
}
