import { HEIGHT } from "../../../../features/Dimensions";
import { Animated, FlatList } from "react-native";
import { useFadeInAnim } from "../../../../animations/useFadeInAnim";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../../cards/ExerciseCard";
import { useEffect, useState } from "react";
import { SessionExerciseListHeader } from "./SessionExerciseListHeader";
import { SessionExerciseListAddNewButton } from "./SessionExerciseListAddNewButton";
import { SessionLayoutItem } from "../../../../stores/workout/types";

interface SessionExerciseListProps {
  listOpen: boolean;
  togglePanel: () => void;
}
export function SessionExerciseList({
  listOpen,
  togglePanel,
}: SessionExerciseListProps) {
  const { activeSession } = useWorkoutStore();
  const { activeExercise, setActiveExercise } = useWorkoutStore();
  const { fadeIn } = useFadeInAnim();

  const [selectMode, setSelectMode] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleExerciseSelect = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter((i) => i !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleExerciseUse = (exerciseId: string) => {
    setActiveExercise(exerciseId);
    togglePanel();
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedExercises([]);
  };

  useEffect(() => {
    setSelectedExercises([]);
    setSelectMode(false);
  }, [listOpen]);

  function card({ item }: { item: SessionLayoutItem }) {
    if (item.type === "exercise")
      return (
        <ExerciseCard
          exercise={item.exercise}
          onUse={handleExerciseUse}
          onSelect={handleExerciseSelect}
          isActive={activeExercise?.id === item.exercise.id}
          isSelected={selectedExercises.some(
            (i: string) => i === item.exercise.id
          )}
          multipleSelect={selectMode}
        />
      );
    return null;
  }

  if (listOpen)
    return (
      <Animated.View
        style={{
          paddingBottom: 80,
          height: HEIGHT - 120,
          ...fadeIn,
        }}
      >
        <SessionExerciseListHeader
          selectMode={selectMode}
          toggleSelectMode={toggleSelectMode}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          setSelectMode={setSelectMode}
        />
        <FlatList
          data={activeSession.layout}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => card({ item })}
          ListFooterComponent={() => (
            <SessionExerciseListAddNewButton
              style={{
                opacity: selectMode ? 0 : 1,
              }}
            />
          )}
        />
      </Animated.View>
    );

  return null;
}
