import { Stack } from "expo-router";
import { Fragment } from "react";
import { DaySliderScreen } from "../components/sessions/DaySliderScreen";
import { SummaryHeader } from "../components/sessions/header/SummaryHeader";
import { useUIStore } from "../stores/ui/useUIStore";

export default function SummaryScreen() {
  const { currentWeekIndex } = useUIStore();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          header: () => <SummaryHeader key={`${currentWeekIndex}`} />,
        }}
      />
      <DaySliderScreen />
    </Fragment>
  );
}
