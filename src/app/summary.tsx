import { Stack } from "expo-router";
import { Fragment } from "react";
import { useUIStore } from "../stores/ui/useUIStore";
import { IText } from "../components/ui/text/IText";
import { WeekSummarySlider } from "../components/summary/WeekSummarySlider";
import { getWeekRange } from "../features/calendar/useWeeks";

export default function SummaryScreen() {
  const { weeks, currentWeekIndex } = useUIStore();

  const currentWeek = getWeekRange(weeks[currentWeekIndex], "long");

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <IText
              text={`${currentWeek}`}
              adjustsFontSizeToFit
              numberOfLines={1}
            />
          ),
        }}
      />
      <WeekSummarySlider />
    </Fragment>
  );
}
