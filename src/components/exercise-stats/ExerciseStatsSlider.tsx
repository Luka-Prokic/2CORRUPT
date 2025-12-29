import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { WIDTH } from "../../utils/Dimensions";
import { LabeledValue } from "../ui/misc/LabeledValue";
import {
  useExercisePRWeight,
  useExerciseTotalSets,
  useExerciseReps,
  useExerciseCount,
  useExerciseWeight,
} from "../../features/exercise-stats/useExerciseStats";
import { useExercisePRReps } from "../../features/exercise-stats/useExerciseStats";
import { useExerciseMaxReps } from "../../features/exercise-stats/useExerciseStats";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { useDisplayedUnits } from "../../features/translate/useDisplayedUnits";

type ExerciseStats = {
  title: string;
  value: number;
  unit?: string;
};

interface ExerciseStatsSliderProps {
  exercise: ExerciseInfo;
}

export function ExerciseStatsSlider({ exercise }: ExerciseStatsSliderProps) {
  const { theme, units } = useSettingsStore();
  const { t } = useTranslation();

  const pr = useExercisePRWeight(exercise.id);
  const prReps = useExercisePRReps(exercise.id);
  const maxReps = useExerciseMaxReps(exercise.id);
  const totalSets = useExerciseTotalSets(exercise.id);
  const totalReps = useExerciseReps(exercise.id);
  const timesUsed = useExerciseCount(exercise.id);
  const totalWeight = useExerciseWeight(exercise.id);

  const data: ExerciseStats[] = useMemo(() => {
    return [
      {
        title: "PR",
        value: pr,
        unit: units.weight,
      },
      {
        title: "PR Reps",
        value: prReps,
      },
      {
        title: "Used In",
        value: timesUsed,
        unit: `${
          timesUsed === 1
            ? t("sessions.session").toLocaleLowerCase()
            : t("sessions.sessions").toLocaleLowerCase()
        }`,
      },
      {
        title: "Sets",
        value: totalSets,
      },
      {
        title: "Reps",
        value: totalReps,
      },

      {
        title: "Weight",
        value: totalWeight,
        unit: units.weight,
      },
    ];
  }, [pr, prReps, maxReps, totalSets]);

  return (
    <CenterCardSlider
      data={data}
      sliderWidth={WIDTH}
      animationType="flat"
      cardWidth={WIDTH / 3}
      cardHeight={WIDTH / 3}
      selectedIndex={1}
      selectedCardIndex={1}
      initialScrollIndex={1}
      getItemLayout={(_, index) => ({
        length: WIDTH / 3,
        offset: (WIDTH / 3) * index,
        index,
      })}
      hapticFeedback
      hideDots
      card={({ item }) => <ExerciseStatsCard item={item} />}
    />
  );
}

function ExerciseStatsCard({ item }: { item: ExerciseStats }) {
  const { units } = useSettingsStore();
  const { fromKg } = useDisplayedUnits();
  const { t } = useTranslation();

  const displayedValue = useMemo(() => {
    if (item.value == undefined || item.value == 0) return "-";
    if (item.title === "Total Weight") {
      return fromKg(item.value);
    }
    return item.value;
  }, [item.value, item.unit]);

  const displayedTitle = useMemo(() => {
    if (item.unit === units.weight) {
      return `${item.title} (${t(`units.weight.${units.weight}`)})`;
    }
    return item.title;
  }, [item.title, item.unit]);

  return (
    <LabeledValue
      label={displayedTitle}
      value={displayedValue}
      align="center"
      style={{
        width: WIDTH / 3,
        height: WIDTH / 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
