import { useTranslation } from "react-i18next";
import { ExerciseInfo, SessionExercise } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workoutStore";

export function useTranslatedExercisesNames(exercises: ExerciseInfo[]) {
  const { t } = useTranslation();
  const translatedNames = exercises.map((ex) => ({
    ...ex,
    translatedName:
      t(`exercises.${ex.slug}`) !== `exercises.${ex.slug}`
        ? t(`exercises.${ex.slug}`)
        : ex.defaultName,
  }));
  return { translatedNames };
}

export function useTranslatedExerciseName(exercise: ExerciseInfo) {
  const { t } = useTranslation();

  const translatedName =
    t(`exercises.${exercise.slug}`) !== `exercises.${exercise.slug}`
      ? t(`exercises.${exercise.slug}`)
      : exercise.defaultName;

  return { translatedName };
}

export function useTranslatedSessionExerciseName(exercise: SessionExercise) {
  const { t } = useTranslation();
  const { exercises } = useWorkoutStore(); // all canonical exercises

  if (!exercise) return { translatedName: t("app.no-exercise") };

  // Try to find canonical exercise by id
  const canonical: ExerciseInfo | undefined = exercises.find(
    (e) => e.id === exercise.exerciseInfoId
  );

  const translatedName =
    canonical &&
    canonical.slug &&
    t(`exercises.${canonical.slug}`) !== `exercises.${canonical.slug}`
      ? t(`exercises.${canonical.slug}`)
      : exercise.name; // fallback to session exercise name

  return { translatedName };
}
