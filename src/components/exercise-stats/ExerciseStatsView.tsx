import { View } from "react-native";
import { ExerciseInfo } from "../../stores/workout/types";
import { ExerciseStatsSlider } from "./ExerciseStatsSlider";
import { ExerciseStatsBadge } from "./ExerciseStatsBadge";

interface ExerciseStatsViewProps {
  exercise: ExerciseInfo;
}

export function ExerciseStatsView({ exercise }: ExerciseStatsViewProps) {
  return (
    <View>
      <ExerciseStatsBadge />
      <ExerciseStatsSlider exercise={exercise} />
    </View>
  );
}
