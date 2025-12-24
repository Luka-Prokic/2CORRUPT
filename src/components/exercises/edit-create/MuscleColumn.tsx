import { View } from "react-native";
import { useEffect, useMemo } from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { IButton } from "../../ui/buttons/IButton";
import { InfoText } from "../../ui/text/InfoText";
import { ShineText } from "../../ui/text/ShineText";
import {
  ExerciseInfo,
  Muscle,
  MuscleCategory,
  MuscleType,
  useWorkoutStore,
} from "../../../stores/workout";
import { CATEGORY_RULES } from "../../../config/constants/muscleOrder";

function getKeys(type: MuscleType) {
  return {
    key: type === "primary" ? "primaryMuscles" : "secondaryMuscles",
    otherKey: type === "primary" ? "secondaryMuscles" : "primaryMuscles",
  } as const;
}

function getAllowedMuscles(
  muscleCategories: MuscleCategory[],
  category: MuscleCategory["id"],
  type: MuscleType,
  exclude: Muscle["id"][]
) {
  const rule = CATEGORY_RULES[category] ?? CATEGORY_RULES["full-body"];

  const seen = new Set<Muscle["id"]>();

  return muscleCategories
    .filter((c) => rule[type].includes(c.id))
    .flatMap((c) => c.muscles)
    .filter((m) => {
      if (exclude.includes(m.id)) return false;
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
}

interface MuscleColumnProps {
  title: string;
  type: MuscleType;
  exercise: ExerciseInfo;
}

export function MuscleColumn({ title, type, exercise }: MuscleColumnProps) {
  const { theme } = useSettingsStore();
  const { muscleCategories, updateDraftExercise } = useWorkoutStore();

  const { key, otherKey } = getKeys(type);
  const selected = exercise[key];

  const options = useMemo(
    () =>
      getAllowedMuscles(
        muscleCategories,
        exercise.category,
        type,
        exercise[otherKey]
      ),
    [muscleCategories, exercise.category, type, exercise[otherKey]]
  );

  useEffect(() => {
    const allowedIds = new Set(options.map((m) => m.id));
    const cleaned = selected.filter((id) => allowedIds.has(id));

    if (cleaned.length !== selected.length) {
      updateDraftExercise({ [key]: cleaned });
    }
  }, [exercise.category, type]);

  function toggleMuscle(muscleId: Muscle["id"]) {
    const updated = selected.includes(muscleId)
      ? selected.filter((id) => id !== muscleId)
      : [...selected, muscleId];

    updateDraftExercise({
      [key]: updated,
      [otherKey]: exercise[otherKey].filter((id) => id !== muscleId),
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <InfoText text={title} />

      {options.map((muscle) => {
        const isSelected = selected.includes(muscle.id);

        return (
          <IButton
            key={muscle.id}
            onPress={() => toggleMuscle(muscle.id)}
            style={{ height: 54 }}
            haptics
          >
            <ShineText
              text={muscle.name}
              color={isSelected ? theme.tint : theme.grayText}
              size={18}
              constant
              focused={isSelected}
            />
          </IButton>
        );
      })}
    </View>
  );
}
