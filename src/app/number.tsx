import { Fragment } from "react";
import { ScreenView } from "../components/ui/containers/ScreenView";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { CorruptHeader } from "../components/corrupt/CorruptHeader";
import { Stack } from "expo-router";
import { SegmentTime } from "../components/ui/WHATSINTHEBOX/SegmentTime";
import { SevenSegmentSessionTimer } from "../components/ui/timer/SevenSegmentSessionTimer";

export default function NumberScreen() {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <Fragment />,
          headerTitle: () => <CorruptHeader />,
          headerBlurEffect: "none",
        }}
      />

      <ScreenContent scroll={false}>
        <ScreenView
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
            gap: 11,
          }}
        >
          {/* <SegmentTime hours={1} minutes={23} seconds={45} /> */}
          <SevenSegmentSessionTimer />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
