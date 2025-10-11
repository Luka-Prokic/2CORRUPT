import { View, Text, Platform } from "react-native";
import { SessionExercise } from "../../../stores/workout/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Set, DropSet } from "../../../stores/workout/types";
import { DashLine } from "../../ui/misc/DashLine";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { WIDTH } from "../../../features/Dimensions";

interface ExerciseRecapProps {
  exercise: SessionExercise;
}

export function ExerciseRecap({ exercise }: ExerciseRecapProps) {
  const { theme } = useSettingsStore();
  const fontFamily = Platform.OS === "ios" ? "Menlo" : "monospace";

  const colWidths = {
    index: 24,
    reps: 50,
    weight: 50,
    rpe: 40,
    rir: 40,
  };

  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
      <View style={{ width: WIDTH * 0.6 }}>
        <ExerciseName exercise={exercise} fontSize={28} />
      </View>

      {exercise.sets.map((set: Set, idx: number) => (
        <View key={`${exercise.id}-${set.id}`} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", marginLeft: 8 }}>
            <Text
              style={{
                width: colWidths.index,
                fontFamily,
                color: theme.text,
                fontSize: 18,
              }}
            >
              {idx + 1}
            </Text>
            <Text
              style={{
                width: colWidths.reps,
                fontFamily,
                color: theme.text,
                fontSize: 18,
              }}
            >
              {set.reps ?? 0} x
            </Text>
            <Text
              style={{
                width: colWidths.weight,
                fontFamily,
                color: theme.text,
                fontSize: 18,
              }}
            >
              {set.weight ?? 0}
            </Text>
            <Text
              style={{
                width: colWidths.rpe,
                fontFamily,
                color: theme.text,
                fontSize: 18,
              }}
            >
              {set.rpe ?? ""}
            </Text>
            <Text
              style={{
                width: colWidths.rir,
                fontFamily,
                color: theme.text,
                fontSize: 18,
              }}
            >
              {set.rir ?? ""}
            </Text>
          </View>

          {set.dropSets?.map((dropSet: DropSet, dropIdx: number) => (
            <View
              key={`${exercise.id}-${dropSet.id}-${dropIdx}`}
              style={{ flexDirection: "row", marginLeft: 8, marginTop: 2 }}
            >
              <Text
                style={{
                  width: colWidths.index,
                  fontFamily,
                  color: theme.grayText,
                  fontSize: 16,
                }}
              >
                {dropIdx + 1}'
              </Text>
              <Text
                style={{
                  width: colWidths.reps,
                  fontFamily,
                  color: theme.grayText,
                  fontSize: 16,
                }}
              >
                {dropSet.reps} x
              </Text>
              <Text
                style={{
                  width: colWidths.weight,
                  fontFamily,
                  color: theme.grayText,
                  fontSize: 16,
                }}
              >
                {dropSet.weight}
              </Text>
            </View>
          ))}
        </View>
      ))}

      <DashLine />
    </View>
  );
}
