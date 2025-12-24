import { Stack } from "expo-router";
import { Fragment } from "react";
import { useUIStore } from "../stores/ui/useUIStore";
import { IText } from "../components/ui/text/IText";
import { WeekSummarySlider } from "../components/summary/WeekSummarySlider";
import { getWeekRange } from "../features/calendar/useWeeks";

export default function SummaryScreen() {
  const { weeks, currentWeekIndex, setCurrentWeekIndex } = useUIStore();

  const currentWeek = getWeekRange(weeks[currentWeekIndex], "mid");
  const currentYear = new Date().getFullYear();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <IText
              text={`${currentWeek} ${currentYear}`}
              adjustsFontSizeToFit
              numberOfLines={1}
            />
          ),
        }}
      />
      <WeekSummarySlider
        weeks={weeks}
        currentWeekIndex={currentWeekIndex}
        setCurrentWeekIndex={setCurrentWeekIndex}
      />
    </Fragment>
  );
}
