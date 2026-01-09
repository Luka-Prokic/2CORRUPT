import { Fragment, useRef } from "react";
import { BounceButton } from "../../../../ui/buttons/BounceButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SessionPreviewBottomSheet } from "../../../../recap/workout-preview/SessionPreviewBottomSheet";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../../stores/workout/useWorkoutStore";
import { ProgressRing } from "../../../../ui/misc/ProgressRing";
import { useSessionCompletionRatio } from "../../../../../features/workout/useSessionHistory";
import { InfoText } from "../../../../ui/text/InfoText";

export function ActiveSessionPreviewButton() {
  const { theme } = useSettingsStore();
  const sessionChartBottomSheetRef = useRef<BottomSheetModal>(null);
  const { activeSession } = useWorkoutStore();
  const data = useSessionCompletionRatio(activeSession);

  function handlePress() {
    sessionChartBottomSheetRef.current?.present();
  }

  return (
    <Fragment>
      <BounceButton onPress={handlePress} style={{ width: 64, height: 64 }}>
        <ProgressRing
          compareWith={data}
          compareTo={1}
          color={theme.handle}
          loopColor={theme.fifthBackground}
          arrowColor={data > 0.01 ? theme.handle : theme.info}
          content={
            <InfoText
              text={`${Math.round(data * 100)}%`}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
              color={data > 0.01 ? theme.fifthBackground : theme.info}
            />
          }
          ringSize={54}
        />
      </BounceButton>
      <SessionPreviewBottomSheet
        ref={sessionChartBottomSheetRef}
        session={activeSession}
      />
    </Fragment>
  );
}
