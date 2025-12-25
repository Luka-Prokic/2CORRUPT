import { View } from "react-native";
import { ExerciseInfo } from "../../../stores/workout/types";
import { IText } from "../../ui/text/IText";

interface ExerciseInfoViewProps {
  exercise: ExerciseInfo;
}

export function ExerciseInfoView({ exercise }: ExerciseInfoViewProps) {
  return (
    <View>
      <IText text="ExerciseInfoView" />
    </View>
  );
}
