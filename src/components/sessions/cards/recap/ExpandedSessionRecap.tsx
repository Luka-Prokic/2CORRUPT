import { WorkoutSession } from "../../../../stores/workout";
import { WIDTH } from "../../../../features/Dimensions";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSettingsStore } from "../../../../stores/settings";
import { useTranslation } from "react-i18next";
import { ExpandedSessionRecapHeader } from "./ExpandedSessionRecapHeader";

interface ExpandedSessionRecapProps {
  session: WorkoutSession;
}

export function ExpandedSessionRecap({ session }: ExpandedSessionRecapProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        width: WIDTH,
        backgroundColor: theme.thirdBackground + "40",
        paddingHorizontal: 16,
      }}
    >
      <ExpandedSessionRecapHeader session={session} />
    </Animated.View>
  );
}
