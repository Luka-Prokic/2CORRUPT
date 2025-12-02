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
import { DescriptionText } from "../../ui/text/DescriptionText";
import { InfoText } from "../../ui/text/InfoText";

interface WeekDayProps {
  date: Date;
}
export function WeekDay({ date }: WeekDayProps) {
  const { theme } = useSettingsStore();
  const dayLabels = useDayLabels();
  const isFuture = isFutureDate(date);
  const isTodayDate = isToday(date);
  const isDone = useSessionsByDate(date).length ? true : false;
  const { currentWeekIndex, selectedDate, setSelectedDate, weeks } =
    useUIStore();
  const dayIndex = getDayIndex(date);

  const selectedIndexInWeek = weeks[currentWeekIndex].findIndex(
    (d) => d.toDateString() === selectedDate.toDateString()
  );
  const isSelected = dayIndex === selectedIndexInWeek;

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
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
    >
      {isDone && !isSelected ? (
        <Ionicons
          name="checkmark-circle"
          color={theme.fifthBackground}
          size={WIDTH / 7}
        />
      ) : (
        <Fragment>
          <InfoText
            style={{
              marginBottom: 2,
              color: isFuture
                ? theme.handle
                : isSelected
                ? theme.background
                : isTodayDate
                ? theme.accent
                : theme.text,
            }}
            text={dayLabels[dayIndex]}
          />
          <DescriptionText
            style={{
              color: isFuture
                ? theme.handle
                : isSelected
                ? theme.background
                : isTodayDate
                ? theme.accent
                : theme.text,
            }}
            text={date?.getDate().toString() ?? ""}
          />
        </Fragment>
      )}
    </TouchableOpacity>
  );
}
