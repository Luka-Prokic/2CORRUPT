import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../../stores/workout/types";

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
