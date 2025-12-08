import { HEIGHT, WIDTH } from "../../../../utils/Dimensions";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../../cards/ExerciseCard";
import { useState } from "react";
import { ExerciseListHeader } from "./ExerciseListHeader";
import { ExerciseListAddNewButton } from "./ExerciseListAddNewButton";
import { SessionExercise } from "../../../../stores/workout/types";

interface SessionExerciseListProps {
  togglePanel: () => void;
}

export function SessionExerciseList({ togglePanel }: SessionExerciseListProps) {
  const { activeSession, setActiveExercise, reorderSessionItems } =
    useWorkoutStore();
  const [selectMode, setSelectMode] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  if (!activeSession) return null;

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

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{ width: WIDTH, height: HEIGHT - 200 }}
    >
      <ExerciseListHeader
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        setSelectMode={setSelectMode}
      />

      <DraggableFlatList
        data={activeSession.layout}
        style={{ height: HEIGHT - 200, paddingTop: 64 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: SessionExercise) => item.id}
        renderItem={({ item, drag, isActive }) => (
          <ExerciseCard
            exercise={item}
            onUse={handleExerciseUse}
            onSelect={handleExerciseSelect}
            selectedExercises={selectedExercises}
            multipleSelect={selectMode}
            drag={!selectMode ? drag : undefined} // enable drag on long press
            isActiveDrag={isActive}
          />
        )}
        onDragEnd={({ data }) => {
          reorderSessionItems(data); // overwrite the order directly
        }}
        ListFooterComponent={() => (
          <ExerciseListAddNewButton
            style={{
              opacity: selectMode ? 0 : 1,
              marginBottom: 100,
            }}
          />
        )}
      />
    </Animated.View>
  );
}
