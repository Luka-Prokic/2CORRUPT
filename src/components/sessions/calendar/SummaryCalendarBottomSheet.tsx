import { forwardRef, useMemo, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CalendarList, DateData } from "react-native-calendars";
import { useSettingsStore } from "../../../stores/settings";
import { BlurView } from "expo-blur";
import { View } from "react-native";
import { HEIGHT } from "../../../features/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSessionsGroupedByDay } from "../../../features/workout/useSessionHistory";
import { useUIStore } from "../../../stores/ui/useUIStore";

interface MarkedDate {
  marked?: boolean;
  dotColor?: string;
  selected?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
}

const toLocalKey = (date: Date) => {
  const y = date?.getFullYear();
  const m = String(date?.getMonth() + 1).padStart(2, "0");
  const d = String(date?.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const SummaryCalendarBottomSheet = forwardRef<BottomSheetModal>(
  (_, ref) => {
    const { theme } = useSettingsStore();
    const insets = useSafeAreaInsets();
    const sessionsByDay = useSessionsGroupedByDay();
    const { selectedDate, setSelectedDate } = useUIStore();

    const handleDayPress = useCallback(
      (day: DateData) => {
        const date = new Date(day.dateString);
        date.setHours(0, 0, 0, 0);

        setSelectedDate(date);
      },
      [setSelectedDate]
    );

    const marked: Record<string, MarkedDate> = useMemo(() => {
      const obj: Record<string, MarkedDate> = {};

      // Add all session days
      Object.keys(sessionsByDay).forEach((dateKey) => {
        obj[dateKey] = {
          selected: true,
          selectedColor: theme.fifthBackground,
          selectedTextColor: theme.secondaryText,
        };
      });

      // Mark selectedDate (fixed: use local key)
      const selectedKey = toLocalKey(selectedDate);

      obj[selectedKey] = {
        ...obj[selectedKey],
        selected: true,
        selectedColor: theme.tint,
        selectedTextColor: theme.secondaryText,
      };

      return obj;
    }, [sessionsByDay, selectedDate, theme]);

    const todayString = new Date().toISOString().split("T")[0];

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        enableDismissOnClose
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        backgroundStyle={{ backgroundColor: "transparent" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
            opacity={0.2}
          />
        )}
      >
        <BottomSheetView>
          <BlurView
            tint="light"
            style={{
              height: HEIGHT * 0.8,
              borderRadius: 24,
              overflow: "hidden",
              backgroundColor: hexToRGBA(theme.glow, 0.4),
              borderWidth: 1,
              borderColor: theme.info,
              paddingBottom: insets.bottom,
            }}
          >
            {/* Handle inside blur */}
            <View
              style={{
                height: 4,
                width: 32,
                borderRadius: 2,
                backgroundColor: theme.info,
                alignSelf: "center",
                marginVertical: 16,
              }}
            />

            <CalendarList
              markedDates={marked}
              onDayPress={handleDayPress}
              scrollEnabled={true}
              pastScrollRange={1}
              futureScrollRange={0}
              current={todayString} // start from selected
              maxDate={todayString}
              firstDay={1}
              disableAllTouchEventsForDisabledDays
              theme={{
                calendarBackground: "transparent",
                textSectionTitleColor: theme.text,
                dayTextColor: theme.text,
                textDisabledColor: theme.handle,
                monthTextColor: theme.text,
                textDayFontWeight: "500",
                textMonthFontWeight: "bold",
                textMonthFontSize: 22,
              }}
            />
          </BlurView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
