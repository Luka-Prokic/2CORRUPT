import { Set } from "../../../../stores/workout/types";
import { FilterFlatSlider } from "../../../ui/FilterFlatSlider";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import * as Haptics from "expo-haptics";

interface InputRPEProps {
  set: Set;
}

export function InputRPE({ set }: InputRPEProps) {
  const { updateSetInActiveExercise } = useWorkoutStore();
  const scale = Array.from({ length: 10 }, (_, index) =>
    (index + 1).toString()
  );

  const handleSelect = (item: string) => {
    updateSetInActiveExercise(set.id, { rpe: parseInt(item) });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  return (
    <FilterFlatSlider
      data={scale}
      startIndex={set.rpe ? set.rpe - 1 : 0}
      itemWidth={54}
      onSelect={handleSelect}
      contentContainerStyle={{
        height: 54,
        width: 54,
      }}
      itemStyle={{ height: 54 }}
      textStyle={{ fontSize: 16 }}
    />
  );
}
