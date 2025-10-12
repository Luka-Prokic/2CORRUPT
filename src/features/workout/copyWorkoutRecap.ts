import * as Clipboard from "expo-clipboard"; // import everything
import { Alert } from "react-native";
import {
  SessionExercise,
  Set,
  WorkoutSession,
} from "../../stores/workout/types";
import { useSettingsStore } from "../../stores/settingsStore";

interface CopyWorkoutRecapProps {
  session: WorkoutSession;
}

export async function copyWorkoutRecap({ session }: CopyWorkoutRecapProps) {
  const { units } = useSettingsStore.getState();

  let text = "";

  const isWeightUsed = session.layout.some((exercise: SessionExercise) =>
    exercise.sets.some((set: Set) => set.weight)
  );
  const isDropSetused = session.layout.some((exercise: SessionExercise) =>
    exercise.sets.some((set: Set) => set.dropSets)
  );
  const isRPEused = session.layout.some((exercise: SessionExercise) =>
    exercise.sets.some((set: Set) => set.rpe)
  );
  const isRIRused = session.layout.some((exercise: SessionExercise) =>
    exercise.sets.some((set: Set) => set.rir)
  );

  // add legend / guide at top
  text += "------------------------\n";
  text += "Legend:\n";
  text += "1. - Set\n";
  text += `0 - Reps\n`;
  if (isWeightUsed) text += `x 0 - Weight (${units.weight.toUpperCase()})\n`;
  if (isRPEused) text += "| 0 - RPE\n";
  if (isRIRused) text += "| 0 - RIR\n";
  if (isDropSetused) text += "1' - Drop set\n";
  text += "------------------------\n\n";

  // add session details
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
  Alert.alert("Copied!", "Session recap copied to clipboard with legend.");
}
