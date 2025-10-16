import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { Animated, FlatList } from "react-native";
import { useFadeInAnim } from "../../../../animations/useFadeInAnim";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../../cards/ExerciseCard";
import { useState } from "react";
import { SessionExerciseListHeader } from "./SessionExerciseListHeader";
import { SessionExerciseListAddNewButton } from "./SessionExerciseListAddNewButton";

interface SessionExerciseListProps {
  togglePanel: () => void;
}

export function SessionExerciseList({ togglePanel }: SessionExerciseListProps) {
  const { activeSession } = useWorkoutStore();
  const { setActiveExercise } = useWorkoutStore();
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

  const renderCard = (item: any) => {
    return (
      <ExerciseCard
        exercise={item}
        onUse={handleExerciseUse}
        onSelect={handleExerciseSelect}
        selectedExercises={selectedExercises}
        multipleSelect={selectMode}
      />
    );
  };

  if (!activeSession) return null;

  return (
    <Animated.View
      style={{
        width: WIDTH,
        height: HEIGHT - 200,
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
        data={activeSession?.layout}
        keyExtractor={(item) =>
          "group" in item ? `group-${item.group}` : item.id
        }
        renderItem={({ item }) => renderCard(item)}
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
}
