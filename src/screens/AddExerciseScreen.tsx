import { useEffect, useRef, useState } from "react";
import { Animated, FlatList } from "react-native";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { IButton } from "../components/ui/buttons/IButton";
import { ExerciseInfo, SessionExercise } from "../stores/workout/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { WIDTH } from "../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../features/HEXtoRGB";
import { router } from "expo-router";

export function AddExerciseScreen() {
  const { exercises, addExerciseToSession, setActiveExercise } =
    useWorkoutStore();
  const { theme } = useSettingsStore();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>(
    []
  );
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercises([...selectedExercises, exercise]);
  }

  function handleRemoveExercise() {
    setSelectedExercises(
      selectedExercises.filter(
        (exercise: ExerciseInfo) => exercise.id !== exercise.id
      )
    );
  }

  function handleAddExercise() {
    selectedExercises.forEach((exercise: ExerciseInfo) => {
      addExerciseToSession(createSessionExercise(exercise));
    });
    setActiveExercise(selectedExercises[0].id);
    router.back();
  }

  function handleAddSuperSet() {
    //TODO: Add super set to session
  }

  useEffect(() => {
    if (selectedExercises.length > 0) {
      Animated.spring(animatedOpacity, {
        toValue: 1,
        speed: 100,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedOpacity, {
        toValue: 0,
        speed: 100,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedExercises]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard exercise={item} onSelect={handleSelectExercise} />
        )}
        style={{ paddingHorizontal: 16 }}
      />
      <Animated.View style={{ opacity: animatedOpacity }}>
        <LinearGradient
          colors={[hexToRGBA(theme.text, 0), hexToRGBA(theme.text, 0.4)]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 88,
            width: WIDTH,
            paddingHorizontal: 16,
            // paddingTop: 22,
            flexDirection: "row",
            gap: 8,
            transform: [{ scale: 1.05 }],
          }}
        >
          <IButton
            title={selectedExercises.length.toString()}
            onPress={handleRemoveExercise}
            style={{ height: 44, width: 44, borderRadius: 22 }}
            color={theme.error}
            textColor={theme.secondaryText}
          />
          <IButton
            title="Add Super Set"
            onPress={handleAddSuperSet}
            style={{
              height: 44,
              width: selectedExercises.length > 1 ? WIDTH * 0.5 - 46 : 0,
              borderRadius: 22,
              opacity: selectedExercises.length > 1 ? 1 : 0,
            }}
            color={theme.accent}
            textColor={theme.secondaryText}
          />
          <IButton
            title="Add Exercise"
            onPress={handleAddExercise}
            style={{
              height: 44,
              width:
                selectedExercises.length > 1 ? WIDTH * 0.5 - 46 : WIDTH - 92,
              borderRadius: 22,
            }}
            color={theme.tint}
            textColor={theme.secondaryText}
          />
        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
}

function ExerciseCard({
  exercise,
  onSelect,
}: {
  exercise: ExerciseInfo;
  onSelect: (exercise: ExerciseInfo) => void;
}) {
  const { theme } = useSettingsStore();

  return (
    <IButton
      title={exercise.defaultName}
      onPress={() => onSelect(exercise)}
      style={{ height: 64, width: WIDTH - 32, marginBottom: 8 }}
      color={hexToRGBA(theme.thirdBackground, 0.2)}
      textColor={theme.text}
    />
  );
}

export function createSessionExercise(exercise: ExerciseInfo): SessionExercise {
  return {
    id: `${exercise.id}-${Date.now().toString()}-${Math.random().toString(36)}`,
    exerciseInfoId: exercise.id,
    name: exercise.defaultName,
    prefix: undefined,
    primaryMuscles: [...exercise.primaryMuscles],
    secondaryMuscles: exercise.secondaryMuscles
      ? [...exercise.secondaryMuscles]
      : undefined,
    equipment: exercise.equipment ? [...exercise.equipment] : undefined,
    notes: null,
    sets: [],
    inSuperSet: false,
  };
}
