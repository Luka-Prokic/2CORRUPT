import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { FlatList, Text, View } from "react-native";
import {
  SessionExercise,
  DropSet,
  Set,
  WorkoutSession,
} from "../stores/workout/types";
import { Fragment } from "react";

//Now is used for testing purposes (session history)
export function AllScreen() {
  const { theme } = useSettingsStore();
  const { completedSessions } = useWorkoutStore();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <FlatList
        data={completedSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionItem session={item} />}
      />
    </SafeAreaView>
  );
}

function SessionItem({ session }: { session: WorkoutSession }) {
  const { theme } = useSettingsStore();
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
        {session.name}
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
                  {index + 1}. {set.reps || 0} x {set.weight || 0}
                </Text>
                {set.dropSets?.map((dropSet: DropSet, index: number) => (
                  <Text
                    key={`${item.id}-${dropSet.id}-${index}`}
                    style={{ fontSize: 12, color: theme.grayText }}
                  >
                    {index + 1}' {dropSet.reps || 0} x {dropSet.weight || 0}
                  </Text>
                ))}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </View>
  );
}
