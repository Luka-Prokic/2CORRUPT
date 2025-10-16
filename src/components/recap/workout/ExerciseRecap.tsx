import { View, Text } from "react-native";
import { SessionExercise } from "../../../stores/workout/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Set, DropSet } from "../../../stores/workout/types";
import { DashLine } from "../../ui/misc/DashLine";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { WIDTH } from "../../../features/Dimensions";
import { Fragment } from "react";

interface ExerciseRecapProps {
  exercise: SessionExercise;
}

export function ExerciseRecap({ exercise }: ExerciseRecapProps) {
  const { theme } = useSettingsStore();

  const colWidths = {
    index: 24,
    reps: 50,
    weight: 50,
    rpe: 40,
    rir: 40,
  };

  const totalWeight = exercise.sets.reduce(
    (acc, set) => acc + (set.reps ?? 0) * (set.weight ?? 0),
    0
  );

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 16,
        gap: 4,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: WIDTH * 0.6 }}>
          <ExerciseName exercise={exercise} fontSize={28} />
        </View>
        <DashLine width={WIDTH * 0.2 - 16} />
        <Text
          style={{
            width: WIDTH * 0.2 - 16,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "right",
            color: theme.text,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
        >
          {totalWeight}
        </Text>
      </View>

      {exercise.sets.map((set: Set, idx: number) => {
        const color = set?.isCompleted ? theme.text : theme.grayText;
        return (
          <Fragment key={`${exercise.id}-${set.id}`}>
            <View
              style={{
                flexDirection: "row",
                height: 20,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  width: colWidths.index,
                  color,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {idx + 1}.
              </Text>
              <Text
                style={{
                  width: colWidths.reps,
                  color,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {set.reps ?? 0}
              </Text>
              <Text
                style={{
                  width: colWidths.index,
                  color,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                x
              </Text>
              <Text
                style={{
                  width: colWidths.weight,
                  color,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {set.weight ?? 0}
              </Text>
              <Text
                style={{
                  width: colWidths.rpe,
                  color,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {set.rpe ?? ""}
              </Text>
              <Text
                style={{
                  width: colWidths.rir,
                  color,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {set.rir ?? ""}
              </Text>
            </View>

            {set.dropSets?.map((dropSet: DropSet, dropIdx: number) => (
              <View
                key={`${exercise.id}-${dropSet.id}-${dropIdx}`}
                style={{ flexDirection: "row", height: 24, borderWidth: 0 }}
              >
                <Text
                  style={{
                    width: colWidths.index,
                    color,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {dropIdx + 1}'
                </Text>
                <Text
                  style={{
                    width: colWidths.reps,
                    color,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {dropSet.reps}
                </Text>
                <Text
                  style={{
                    width: colWidths.index,
                    color,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  x
                </Text>
                <Text
                  style={{
                    width: colWidths.weight,
                    color,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {dropSet.weight}
                </Text>
              </View>
            ))}
          </Fragment>
        );
      })}
    </View>
  );
}
