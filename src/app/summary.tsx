import { Stack } from "expo-router";
import { Fragment, useEffect } from "react";
import { DaySliderScreen } from "../components/sessions/DaySliderScreen";
import { SummaryHeader } from "../components/sessions/header/SummaryHeader";
import { useUIStore } from "../stores/ui/useUIStore";

export default function SummaryScreen() {
  const {
    weeks,
    selectedDate,
    setSelectedDate,
    isExpanded,
    resetSelectedDate,
  } = useUIStore();

  useEffect(() => {
    resetSelectedDate();
  }, [resetSelectedDate]);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          header: () => <SummaryHeader />,
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
