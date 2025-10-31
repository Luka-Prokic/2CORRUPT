import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { WorkoutSession } from "../../../../stores/workout";
import { TouchableOpacity, Animated, Text } from "react-native";
import { Fragment, useRef } from "react";
import { SessionBottomSheet } from "../../session-options/SessionBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { SessionRecapCardHeader } from "./SessionRecapCardHeader";
import { useSessionCompletionRatio } from "../../../../features/workout/useSessionHistory";
import { ProgressRing } from "../../../ui/misc/ProgressRing";

interface SessionRecapCardProps {
  session: WorkoutSession;
  zoom?: boolean;
}

export function SessionRecapCard({ session, zoom }: SessionRecapCardProps) {
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
        <Animated.View
          style={{
            width: fullWidth,
            height: halfWidget,
            borderRadius: 24,
            marginHorizontal: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: theme.handle,
            backgroundColor: hexToRGBA(theme.thirdBackground, 0.3),
          }}
        >
          <StrobeBlur
            colors={[
              theme.caka,
              theme.background,
              theme.background,
              theme.tint,
            ]}
            style={{ flex: 1 }}
            disabled={!isCompleted}
          >
            <TouchableOpacity
              onPress={handlePress}
              style={{
                width: fullWidth,
                flex: 1,
                padding: 10,
                gap: 4,
                justifyContent: "space-between",
                alignContent: "center",
                flexDirection: "row",
              }}
            >
              <SessionRecapCardHeader session={session} />
              <ProgressRing
                compareWith={ratio}
                compareTo={1}
                ringSize={halfWidget - 20}
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
            </TouchableOpacity>
          </StrobeBlur>
        </Animated.View>

        <SessionBottomSheet
          session={session}
          ref={bottomSheetRef}
          startView="preview"
        />
      </Fragment>
    );
  return null;
}
