import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { CardSlider } from "../ui/sliders/CardSlider";
import { HEIGHT } from "../../utils/Dimensions";
import { SessionName } from "../board-workout/sheets/session/SessionName";
import { useSettingsStore } from "../../stores/settings";
import { ExercisePreviewCard } from "./cards/ExercisePreviewCard";
import { useLayoutPreviewHeight } from "../../features/ui/useGetExercisePreviewCardHeight";
import { WorkoutSession } from "../../stores/workout/types";
import { Text, ViewStyle } from "react-native";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

interface PreviewSessionProps { 
  session: WorkoutSession;
  style?: ViewStyle | ViewStyle[];
  hideSessionName?: boolean;
  hideNotes?: boolean;
  hideExercises?: boolean;
}

export const PreviewSession = ({
  session,
  style,
  hideSessionName,
  hideNotes,
  hideExercises,
}: PreviewSessionProps) => {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const cardHeight = useLayoutPreviewHeight(session.layout);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={style}>
      {!hideSessionName && (
        <SessionName
          session={session}
          styleView={{ marginVertical: 16 }}
          fontSize={32}
        />
      )}
      {!hideNotes && session.notes && (
        <Text
          style={{
            color: theme.info,
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {session.notes}
        </Text>
      )}

      {!hideExercises && session.layout.length > 0 && (
        <CardSlider
          data={session.layout}
          card={({ item }) => (
            <ExercisePreviewCard exercise={item} maxHeight={finalHeight} />
          )}
          cardWidth={fullWidth}
          cardHeight={finalHeight}
          styleDots={{
            width: fullWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </Animated.View>
  );
};
