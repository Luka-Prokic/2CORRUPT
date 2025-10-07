import { View } from "react-native";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { SessionLayoutItem } from "../../../stores/workout/types";
import { ExerciseCard } from "../exercise/ExerciseCard";

interface SuperSetCardProps {
  superSet: Extract<SessionLayoutItem, { type: "superset" }>;
  onUse: (id: string) => void;
  onSelect: (id: string) => void;
  isActive: boolean;
  isSelected: boolean;
  selectedExerciseId: string | null;
  multipleSelect: boolean;
}

export function SuperSetCard({
  superSet,
  onUse,
  onSelect,
  isActive,
  isSelected,
  selectedExerciseId,
  multipleSelect,
}: SuperSetCardProps) {
  const { theme } = useSettingsStore();

  return (
    <View style={{ gap: 4 }}>
      {superSet.exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          onUse={onUse}
          onSelect={onSelect}
          isActive={isActive}
          isSelected={isSelected}
          multipleSelect={multipleSelect}
        />
      ))}
    </View>
  );
}
