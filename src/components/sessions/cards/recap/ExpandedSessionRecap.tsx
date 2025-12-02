import { WorkoutSession } from "../../../../stores/workout";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSettingsStore } from "../../../../stores/settings";
import { useTranslation } from "react-i18next";
import { ExpandedSessionRecapHeader } from "./ExpandedSessionRecapHeader";
import { ExpandedSessionRecapFooter } from "./ExpandedSessionRecapFooter";
import { ExercisePreviewCard } from "../ExercisePreviewCard";
import { CenterCardSlider } from "../../../ui/sliders/CenterCardSlider";
import { useLayoutPreviewHeight } from "../../../../features/ui/useGetExercisePreviewCardHeight";

interface ExpandedSessionRecapProps {
  session: WorkoutSession;
}

export function ExpandedSessionRecap({ session }: ExpandedSessionRecapProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

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
        // hideDots
      />
    </Animated.View>
  );
}
