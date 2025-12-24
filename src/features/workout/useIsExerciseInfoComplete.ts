import { useMemo } from "react";
import { ExerciseInfo } from "../../stores/workout/types";

export function useIsExerciseInfoComplete(
  draft?: ExerciseInfo | null
): boolean {
  return useMemo(() => {
    if (!draft) return false;

    // name (localized map must have at least one non-empty value)
    const hasName =
      !!draft.defaultName &&
      Object.values(draft.defaultName).some((name) => name.trim().length > 0);

    if (!hasName) return false;

    // category
    if (!draft.category) return false;

    // equipment (must have at least one)
    if (!draft.equipment || draft.equipment.length === 0) return false;

    // muscles (at least one primary OR secondary)
    const hasPrimaryMuscle =
      Array.isArray(draft.primaryMuscles) && draft.primaryMuscles.length > 0;

    if (!hasPrimaryMuscle) return false;

    return true;
  }, [
    draft?.defaultName,
    draft?.category,
    draft?.equipment,
    draft?.primaryMuscles,
    draft?.secondaryMuscles,
  ]);
}
