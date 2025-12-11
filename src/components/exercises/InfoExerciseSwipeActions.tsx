import { View, TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { Swipeable } from "react-native-gesture-handler";
import { ExerciseInfo, useWorkoutStore } from "../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import { useHaptics } from "../../features/ui/useHaptics";
import { useUserStore } from "../../stores/userStore";
import { router } from "expo-router";
import { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MidText } from "../ui/text/MidText";

export function InfoExerciseSwipeActions({
  exercise,
  swipeableRef,
}: {
  exercise: ExerciseInfo;
  swipeableRef: React.RefObject<Swipeable>;
}) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { removeExercise, updateExerciseMetadata, startDraftExercise } =
    useWorkoutStore();
  const { user } = useUserStore();

  const triggerHapticsRigid = useHaptics({
    modeType: "on",
    hapticType: "rigid",
  });
  const triggerHapticsMedium = useHaptics({
    modeType: "gentle",
    hapticType: "medium",
  });
  const triggerHapticsHeavy = useHaptics({
    modeType: "gentle",
    hapticType: "heavy",
  });

  function handleDeleteExercise() {
    triggerHapticsHeavy();
    removeExercise(exercise.id);
  }

  function handleAddToFavorites() {
    triggerHapticsRigid();
    if (exercise.metadata?.isFavorite) {
      updateExerciseMetadata(exercise.id, { isFavorite: false });
    } else {
      updateExerciseMetadata(exercise.id, { isFavorite: true });
    }
  }

  function handleEditPress() {
    startDraftExercise(exercise);
    router.push({
      pathname: "/exercise/[exerciseId]/edit",
      params: { exerciseId: exercise.id },
    });
  }

  function handleCreatePress() {
    startDraftExercise(exercise);
    router.push({
      pathname: "/exercise/[exerciseId]/create",
      params: { exerciseId: exercise.id },
    });
  }

  const isUserMadeExercise = exercise.userId === user?.id;

  return (
    <View
      style={{ flexDirection: "row", alignItems: "flex-start", height: 72 }}
    >
      {isUserMadeExercise && (
        <Fragment>
          <TouchableOpacity
            style={{
              height: 72,
              minWidth: 72,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.error,
            }}
            onPress={handleDeleteExercise}
          >
            <Ionicons name={"trash"} size={24} color={theme.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 72,
              alignItems: "center",
              justifyContent: "center",
              minWidth: 80,
              backgroundColor: theme.accent,
            }}
            onPress={handleEditPress}
          >
            <Ionicons name={"create"} size={24} color={theme.secondaryText} />
          </TouchableOpacity>
        </Fragment>
      )}

      <TouchableOpacity
        style={{
          height: 72,
          minWidth: 72,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.grayText,
        }}
        onPress={handleCreatePress}
      >
        <Ionicons name={"add-circle"} size={24} color={theme.secondaryText} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 72,
          minWidth: 72,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: exercise.metadata?.isFavorite
            ? theme.error
            : theme.caka,
        }}
        onPress={handleAddToFavorites}
      >
        <Ionicons
          name={exercise.metadata?.isFavorite ? "heart-dislike" : "heart"}
          size={24}
          color={theme.secondaryText}
        />
      </TouchableOpacity>
    </View>
  );
}
