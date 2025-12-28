import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../stores/workout";
import { IBubble } from "../ui/containers/IBubble";
import { MuscleColumn } from "./MuscleColumn";

export function ExerciseMuscleSelect() {
  const { t } = useTranslation();
  const { draftExercise } = useWorkoutStore();

  return (
    <IBubble
      size="flexible"
      style={{ paddingHorizontal: 8, paddingVertical: 16 }}
      styleContent={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}
    >
      <MuscleColumn
        title={t("exercise.primary").toUpperCase()}
        exercise={draftExercise}
        type="primary"
      />
      <MuscleColumn
        title={t("exercise.secondary").toUpperCase()}
        exercise={draftExercise}
        type="secondary"
      />
    </IBubble>
  );
}
