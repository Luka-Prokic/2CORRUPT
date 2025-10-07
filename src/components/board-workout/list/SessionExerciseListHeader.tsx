import { View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { IButton } from "../../ui/buttons/IButton";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";

interface SessionExerciseListHeaderProps {
  selectMode: boolean;
  selectedExercises: string[];
  setSelectedExercises: (exercises: string[]) => void;
  setSelectMode: (mode: boolean) => void;
  toggleSelectMode: () => void;
}

export function SessionExerciseListHeader({
  selectMode,
  selectedExercises,
  setSelectedExercises,
  setSelectMode,
  toggleSelectMode,
}: SessionExerciseListHeaderProps) {
  const {
    activeSession,
    activeExercise,
    clearActiveExercise,
    setActiveExercise,
    removeItemFromSession,
  } = useWorkoutStore();
  const { theme } = useSettingsStore();

  function handleRemoveSelectedExercises() {
    selectedExercises.forEach((exerciseId) => {
      if (activeExercise.id === exerciseId) clearActiveExercise();
      removeItemFromSession(exerciseId);
    });
    setSelectedExercises([]);
    setSelectMode(false);
    if (!activeExercise) setActiveExercise(activeSession.layout[0].id);
  }

  if (activeSession.layout.length > 0)
    return (
      <View
        style={{
          height: 24,
          width: WIDTH - 32,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <IButton
          title={selectMode ? "Cancel" : "Select"}
          onPress={toggleSelectMode}
          style={{
            paddingHorizontal: 8,
            height: 24,
            borderRadius: 17,
          }}
          color={hexToRGBA(theme.grayText, 0.5)}
          textColor={theme.glow}
        />

        {selectMode && (
          <IButton
            title="Add to Super Set"
            onPress={() => {
              //TODO: Add selected exercises to superset
            }}
            style={{
              paddingHorizontal: 8,
              height: 24,
              borderRadius: 17,
            }}
            textColor={theme.tint}
          />
        )}
        {selectMode && (
          <IButton
            title="Remove"
            onPress={handleRemoveSelectedExercises}
            style={{
              paddingHorizontal: 8,
              height: 24,
              borderRadius: 17,
            }}
            color={theme.error}
            textColor={theme.glow}
          />
        )}
      </View>
    );

  return null;
}
