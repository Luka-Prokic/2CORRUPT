import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { Animated, FlatList } from "react-native";
import { useFadeInAnim } from "../../../../animations/useFadeInAnim";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../../../board-workout/cards/ExerciseCard";
import { useState } from "react";
import { TemplateExerciseListHeader } from "./TemplateExerciseListHeader";
import { TemplateExerciseListAddNewButton } from "./TemplateExerciseListAddNewButton";

interface TemplateExerciseListProps {
  togglePanel: () => void;
}

export function TemplateExerciseList({ togglePanel }: TemplateExerciseListProps) {
  const { activeTemplate } = useWorkoutStore();
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

  if(!activeTemplate) return null;

  return (
    <Animated.View
      style={{
        width: WIDTH,
        height: HEIGHT - 200,
        ...fadeIn,
      }}
    >
      <TemplateExerciseListHeader
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        setSelectMode={setSelectMode}
      />
      <FlatList
        data={activeTemplate?.layout}
        keyExtractor={(item) =>
          "group" in item ? `group-${item.group}` : item.id
        }
        renderItem={({ item }) => renderCard(item)}
        ListFooterComponent={() => (
          <TemplateExerciseListAddNewButton
            style={{
              opacity: selectMode ? 0 : 1,
            }}
          />
        )}
      />
    </Animated.View>
  );
}
