import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { DayPicker } from "../components/sessions/DayPicker";
import { useCalendarNavigation } from "../features/test/useCalendarNavigation";
import { DaySliderScreen } from "../components/sessions/DaySliderScreen";

export default function SessionssScreen() {
  const {
    currentWeek,
    weeks,
    currentWeekIndex,
    selectedDate,
    dateTittle,
    buttonSize,
    animatedBackgroundStyle,
    handleDayPress,
    isFutureDate,
    isToday,
    setCurrentWeekIndex,
    setSelectedDate,
  } = useCalendarNavigation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: `${dateTittle}`,
        }}
      />
      <ScreenContent edges={["top"]} scroll={false}>
        <DayPicker
          currentWeek={currentWeek}
          weeks={weeks}
          currentWeekIndex={currentWeekIndex}
          selectedDate={selectedDate}
          buttonSize={buttonSize}
          animatedBackgroundStyle={animatedBackgroundStyle}
          onDayPress={handleDayPress}
          setCurrentWeekIndex={setCurrentWeekIndex}
          isFutureDate={isFutureDate}
          isToday={isToday}
        />
        <DaySliderScreen
          weeks={weeks}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </ScreenContent>
    </Fragment>
  );
}
