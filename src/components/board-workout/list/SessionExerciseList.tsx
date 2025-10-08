import { HEIGHT } from "../../../features/Dimensions";
import { Animated, View, ScrollView } from "react-native";
import { useFadeInAnim } from "../../../animations/useFadeInAnim";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { ExerciseCard } from "../exercise/ExerciseCard";
import { SessionLayoutItem } from "../../../stores/workout/types";
import { useEffect, useState } from "react";
import { SessionExerciseListHeader } from "./SessionExerciseListHeader";
import { SessionExerciseListAddNewButton } from "./SessionExerciseListAddNewButton";

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, gap: 4 }}>
            {activeSession.layout.map(
              (item: SessionLayoutItem, index: number) => {
                if (item.type === "exercise") {
                  return (
                    <ExerciseCard
                      key={`${item.id}-${index}`}
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
                }
                return null;
              }
            )}

            {/* Add Exercise */}
            <SessionExerciseListAddNewButton
              style={{
                opacity: selectMode ? 0 : 1,
                marginTop: 16,
              }}
            />
          </View>
        </ScrollView>
      </Animated.View>
    );

  return null;
}
