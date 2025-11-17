import { WorkoutSession } from "../../../stores/workout/types";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { SessionName } from "../../board-workout/sheets/session/SessionName";
import { MuscleRadarChartSession } from "../../sessions/stats/MuscleRadarChartSession";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { View } from "react-native";
import { InfoText } from "../../ui/text/InfoText";
import { useSessionCompletionRatio } from "../../../features/workout/useSessionHistory";
import { ViewStyle } from "react-native";

interface SpiderSessionCardProps {
  session: WorkoutSession;
  onPress?: (session: WorkoutSession) => void;
  style?: ViewStyle | ViewStyle[];
}

export function SpiderSessionCard({
  session,
  onPress,
  style,
}: SpiderSessionCardProps) {
  const { theme } = useSettingsStore();
  const { fullWidth, widgetUnit } = useWidgetUnit();
  const ratio = useSessionCompletionRatio(session);
  const isCompleted = ratio === 1;

  return (
    <StrobeButton
      onPress={() => onPress?.(session)}
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor: theme.secondaryBackground,
        borderRadius: 32,
        ...style,
      }}
      strobeDisabled={!isCompleted}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          width: fullWidth,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 4 }}>
          <SessionName session={session} />
          <InfoText text={new Date(session.startTime).toLocaleDateString()} />
        </View>

        <MuscleRadarChartSession session={session} size={widgetUnit - 32} />
      </Animated.View>
    </StrobeButton>
  );
}
