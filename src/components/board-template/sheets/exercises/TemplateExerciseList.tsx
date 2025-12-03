import { HEIGHT, WIDTH } from "../../../../utils/Dimensions";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../../../board-workout/cards/ExerciseCard";
import { useState } from "react";
import { ExerciseListHeader } from "../../../board-workout/sheets/exercises/ExerciseListHeader";
import { ExerciseListAddNewButton } from "../../../board-workout/sheets/exercises/ExerciseListAddNewButton";
import { SessionExercise } from "../../../../stores/workout";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useSettingsStore } from "../../../../stores/settingsStore";

interface TemplateExerciseListProps {
  togglePanel: () => void;
}

export function TemplateExerciseList({
  togglePanel,
}: TemplateExerciseListProps) {
  const { setActiveExercise, reorderTemplateItems, activeTemplate } =
    useWorkoutStore();
  const { theme } = useSettingsStore();

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

  if (!activeTemplate) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        width: WIDTH,
        height: HEIGHT - 200,
      }}
    >
      <ExerciseListHeader
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        setSelectMode={setSelectMode}
      />

      <DraggableFlatList
        data={activeTemplate.layout}
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
          reorderTemplateItems(data); // overwrite the order directly
        }}
        activationDelay={100} // long press delay to start drag
        ListFooterComponent={() => (
          <ExerciseListAddNewButton
            style={{
              opacity: selectMode ? 0 : 1,
              marginBottom: 100,
              backgroundColor: theme.tint,
            }}
          />
        )}
      />
    </Animated.View>
  );
}
