import { SessionExercise } from "../../../stores/workout/types";
import { View } from "react-native";
import { ExerciseCard } from "./ExerciseCard";

interface SuperSetCardProps {
  exercises: SessionExercise[];
  onUse: (id: string) => void;
  onSelect: (id: string) => void;
  selectedExercises: string[];
  multipleSelect: boolean;
}

export function SuperSetCard({
  exercises,
  onUse,
  onSelect,
  selectedExercises,
  multipleSelect,
}: SuperSetCardProps) {

  return (
    <View style={{ height: 73 * exercises.length, backgroundColor: "red" }}>
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={`${exercise.id}-${index}`}
          exercise={exercise}
          onUse={onUse}
          onSelect={onSelect}
          selectedExercises={selectedExercises}
          multipleSelect={multipleSelect}
        />
      ))}
    </View>
  );
}
