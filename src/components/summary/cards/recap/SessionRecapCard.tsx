import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { WorkoutSession } from "../../../../stores/workout";
import { Text } from "react-native";
import { Fragment, useRef } from "react";
import { SessionBottomSheet } from "../../session-options/SessionBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SessionRecapCardHeader } from "./SessionRecapCardHeader";
import { useSessionCompletionRatio } from "../../../../features/workout/useSessionHistory";
import { ProgressRing } from "../../../ui/misc/ProgressRing";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";
import { hexToRGBA } from "../../../../utils/HEXtoRGB";

interface SessionRecapCardProps {
  session: WorkoutSession;
}

export function SessionRecapCard({ session }: SessionRecapCardProps) {
  const { theme } = useSettingsStore();
  const { halfWidget, fullWidth } = useWidgetUnit();
  const ratio = useSessionCompletionRatio(session);
  const isCompleted = ratio === 1;

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handlePress() {
    bottomSheetRef.current?.present();
  }

  if (session)
    return (
      <Fragment>
        <StrobeButton
          onPress={handlePress}
          strobeColors={[
            theme.caka,
            theme.background,
            theme.background,
            theme.tint,
          ]}
          strobeDisabled={!isCompleted}
          style={{
            width: fullWidth,
            height: halfWidget,
            borderRadius: 32,
            overflow: "hidden",
            backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
            borderWidth: 1,
            borderColor: hexToRGBA(theme.thirdBackground, 0.4),
          }}
          styleContent={{
            padding: 8,
            justifyContent: "space-between",
            alignContent: "center",
            flexDirection: "row",
          }}
          animatedExiting={false}
        >
          <SessionRecapCardHeader session={session} />
          <ProgressRing
            compareWith={ratio}
            compareTo={1}
            ringSize={halfWidget - 16}
            content={
              <Text
                style={{
                  fontSize: 12,
                  color: theme.tint,
                  fontWeight: "bold",
                }}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {Math.round(ratio * 100)}%
              </Text>
            }
          />
        </StrobeButton>

        <SessionBottomSheet
          session={session}
          ref={bottomSheetRef}
          startView="preview"
        />
      </Fragment>
    );
  return null;
}
