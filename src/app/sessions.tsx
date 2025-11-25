import { Stack } from "expo-router";
import { Fragment } from "react";
import { useCalendarNavigation } from "../features/test/useCalendarNavigation";
import { DaySliderScreen } from "../components/sessions/DaySliderScreen";
import { SessionsHeader } from "../components/sessions/header/SessionsHeader";

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
    setCurrentWeekIndex,
    setSelectedDate,
  } = useCalendarNavigation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          header: () => (
            <SessionsHeader
              key={`${currentWeek}`}
              dateTittle={dateTittle}
              currentWeek={currentWeek}
              weeks={weeks}
              currentWeekIndex={currentWeekIndex}
              selectedDate={selectedDate}
              buttonSize={buttonSize}
              animatedBackgroundStyle={animatedBackgroundStyle}
              onDayPress={handleDayPress}
              setCurrentWeekIndex={setCurrentWeekIndex}
            />
          ),
        }}
      />
      <DaySliderScreen
        weeks={weeks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Fragment>
  );
}
