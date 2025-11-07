import { FlatList, View } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { WorkoutSession } from "../../stores/workout/types";
import { Fragment } from "react";
import { SessionExercise } from "../../stores/workout/types";
import { Set } from "../../stores/workout/types";
import { DropSet } from "../../stores/workout/types";
import { Text } from "react-native";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";

export function DevTest() {
  const { completedSessions } = useWorkoutStore();
  return (
    <FlatList
      data={completedSessions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SessionItem session={item} />}
    />
  );
}

function SessionItem({ session }: { session: WorkoutSession }) {
  const { theme } = useSettingsStore();
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
        {session.name}--------------
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
        {session.totals?.totalSets} sets
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
        {session.totals?.totalReps} reps
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
        {session.totals?.totalVolumeKg} kg
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
        Exercises-----------------------
      </Text>
      {session.layout.map((item: SessionExercise, index: number) => {
        return (
          <Fragment key={`${index}-${item.id}`}>
            <Text style={{ fontSize: 16, marginTop: 12, color: theme.text }}>
              {item.prefix ?? ""}
              {item.name}
            </Text>
            {item.sets.map((set: Set, index: number) => (
              <Fragment key={`${item.id}-${set.id}`}>
                <Text
                  style={{
                    fontSize: 14,
                    color: set.isCompleted ? theme.tint : theme.text,
                  }}
                >
                  {index + 1}. {set.reps} x {set.weight} | {set.rpe} | {set.rir}
                </Text>
                {set.dropSets?.map((dropSet: DropSet, index: number) => (
                  <Text
                    key={`${item.id}-${dropSet.id}-${index}`}
                    style={{ fontSize: 12, color: theme.grayText }}
                  >
                    {index + 1}' {dropSet.reps} x {dropSet.weight}
                  </Text>
                ))}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
      <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
        ---------------------------------
      </Text>
    </View>
  );
}
