import { WorkoutSession } from "../../../../stores/workout";
import { HEIGHT, WIDTH } from "../../../../utils/Dimensions";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSettingsStore } from "../../../../stores/settings";
import { ExpandedSessionRecapHeader } from "./ExpandedSessionRecapHeader";
import { ExercisePreviewCard } from "../ExercisePreviewCard";
import { CenterCardSlider } from "../../../ui/sliders/CenterCardSlider";
import { useLayoutPreviewHeight } from "../../../../features/ui/useGetExercisePreviewCardHeight";

interface ExpandedSessionRecapProps {
  session: WorkoutSession;
}

export function ExpandedSessionRecap({ session }: ExpandedSessionRecapProps) {
  const { theme } = useSettingsStore();

  const cardHeight = useLayoutPreviewHeight(session.layout);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        width: WIDTH,
        alignItems: "center",
        borderTopWidth: 2,
        borderTopColor: theme.handle,
      }}
    >
      <ExpandedSessionRecapHeader session={session} />

      <CenterCardSlider
        data={session.layout}
        card={({ item }) => (
          <ExercisePreviewCard
            exercise={item}
            hollow
            square
            width={WIDTH}
            maxHeight={finalHeight}
          />
        )}
        cardWidth={WIDTH}
        cardHeight={finalHeight}
        sliderWidth={WIDTH}
      />
    </Animated.View>
  );
}
