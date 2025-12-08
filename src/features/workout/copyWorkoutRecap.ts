// useCopyWorkoutRecap.ts
import * as Clipboard from "expo-clipboard";
import { useSettingsStore } from "../../stores/settingsStore";
import { SessionExercise, WorkoutSession } from "../../stores/workout/types";

export function useCopyWorkoutRecap() { 
  const { units } = useSettingsStore();

  async function copyWorkoutRecap(session: WorkoutSession) {
    let text = "";

    text += "------------------------\n";
    text += "1. - Set\n";
    text += `0 - Reps\n`;
    text += `x 0 - Weight (${units.weight.toUpperCase()})\n`;
    text += "1' - Drop set\n";
    text += "------------------------\n\n";

    session.layout.forEach((exercise: SessionExercise) => {
      text += `${exercise.prefix ?? ""}${exercise.name}\n`;
      text += `${exercise.notes ?? ""}${exercise.notes ? "\n" : ""}`;
      exercise.sets.forEach((set, idx) => {
        text += `${idx + 1}. ${set.reps ?? 0} x ${set.weight ?? 0}`;
        if (set.rpe) text += ` | RPE: ${set.rpe}`;
        if (set.rir) text += ` | RIR: ${set.rir}`;
        text += "\n";

        set.dropSets?.forEach((ds, dsIdx) => {
          text += `  ${dsIdx + 1}' ${ds.reps} x ${ds.weight}\n`;
        });
      });
      text += "\n";
    });

    await Clipboard.setStringAsync(text);
    // Alert.alert(t("recap.copied"), t("recap.copied-to-clipboard"));
  }

  return { copyWorkoutRecap };
}
