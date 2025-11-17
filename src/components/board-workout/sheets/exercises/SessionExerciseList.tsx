import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../../cards/ExerciseCard";
import { useState } from "react";
import { SessionExerciseListHeader } from "./SessionExerciseListHeader";
import { SessionExerciseListAddNewButton } from "./SessionExerciseListAddNewButton";

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
      <SessionExerciseListHeader
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        setSelectMode={setSelectMode}
      />

      <DraggableFlatList
        data={activeSession.layout}
        keyExtractor={(item) =>
          "group" in item ? `group-${item.group}` : item.id
        }
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
        activationDelay={200} // long press delay to start drag
      />
      <SessionExerciseListAddNewButton
        style={{
          opacity: selectMode ? 0 : 1,
        }}
      />
    </Animated.View>
  );
}
