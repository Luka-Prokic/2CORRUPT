import { View } from "react-native";
import { ExerciseInfo } from "../../../stores/workout/types";
import { IText } from "../../ui/text/IText";
import { UserStatsSlider } from "./UserStatsSlider";

interface ExerciseStatsViewProps {
  exercise: ExerciseInfo;
}

export function ExerciseStatsView({ exercise }: ExerciseStatsViewProps) {
  return (
    <View>
      <UserStatsSlider exercise={exercise} />
    </View>
  );
}
