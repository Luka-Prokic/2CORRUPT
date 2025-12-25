import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { WorkoutSession } from "../../../../stores/workout";
import { Text, View } from "react-native";
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
  const { halfWidget, widgetUnit } = useWidgetUnit();
  const ratio = useSessionCompletionRatio(session);
  const isCompleted = ratio === 1;

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handlePress() {
    bottomSheetRef.current?.present();
  }

  if (!session) return null;
  return (
    <Fragment>
      <StrobeButton
        onPress={handlePress}
        strobeDisabled={!isCompleted}
        style={{
          width: widgetUnit,
          height: halfWidget,
          borderRadius: 32,
          overflow: "hidden",
          backgroundColor: hexToRGBA(theme.thirdAccent, 0.6),
          borderWidth: 1,
          borderColor: hexToRGBA(theme.thirdAccent, 0.4),
        }}
        styleContent={{
          padding: 8,
          justifyContent: "space-between",
          alignContent: "center",
          flexDirection: "row",
        }}
        animatedExiting={false}
      >
        <View style={{ width: halfWidget }}>
          <SessionRecapCardHeader session={session} />
        </View>
        <ProgressRing
          compareWith={ratio}
          compareTo={1}
          ringSize={halfWidget - 16}
          color={theme.thirdAccent}
          loopColor={theme.secondaryAccent}
          content={
            <Text
              style={{
                fontSize: 12,
                color: theme.secondaryAccent,
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
}
