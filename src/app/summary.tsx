import { Stack } from "expo-router";
import { Fragment, useState } from "react";
import { useCalendarNavigation } from "../features/test/useCalendarNavigation";
import { DaySliderScreen } from "../components/sessions/DaySliderScreen";
import { SummaryHeader } from "../components/sessions/header/SummaryHeader";

export default function SummaryScreen() {
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
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpandPress() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          header: () => (
            <SummaryHeader
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
              onExpandPress={handleExpandPress}
              isExpanded={isExpanded}
            />
          ),
        }}
      />
      <DaySliderScreen
        weeks={weeks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isExpanded={isExpanded}
      />
    </Fragment>
  );
}
