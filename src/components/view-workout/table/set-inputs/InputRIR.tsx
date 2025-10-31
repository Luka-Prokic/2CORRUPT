import { Set } from "../../../../stores/workout/types";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { FilterFlatSlider } from "../../../ui/FilterFlatSlider";
import * as Haptics from "expo-haptics";

interface InputRIRProps {
  set: Set;
  disabled?: boolean;
}

export function InputRIR({ set, disabled }: InputRIRProps) {
  const { updateSetInActiveExercise } = useWorkoutStore();
  const scale = Array.from({ length: 6 }, (_, index) => {
    if (index === 5) return "5+";
    return index.toString();
  });

  const handleSelect = (item: string) => {
    updateSetInActiveExercise(set.id, {
      rir: item === "5+" ? 5 : parseInt(item),
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  return (
    <FilterFlatSlider
      data={scale}
      startIndex={set.rir ?? 0}
      itemWidth={54}
      onSelect={handleSelect}
      contentContainerStyle={{
        height: 54,
        width: 54,
      }}
      itemStyle={{ height: 54 }}
      textStyle={{ fontSize: 16 }}
      disabled={disabled}
    />
  );
}
