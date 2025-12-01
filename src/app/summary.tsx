import { Stack } from "expo-router";
import { Fragment } from "react";
import { DaySliderScreen } from "../components/sessions/DaySliderScreen";
import { SummaryHeader } from "../components/sessions/header/SummaryHeader";

export default function SummaryScreen() {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          header: () => <SummaryHeader />,
        }}
      />
      <DaySliderScreen />
    </Fragment>
  );
}
