import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { FlatList, Text, View } from "react-native";
import {
  SessionLayoutItem,
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
      {session.layout.map((item: SessionLayoutItem, index: number) => {
        if (item.type === "exercise")
          return (
            <Fragment key={`${index}-${item.exercise.id}`}>
              <Text style={{ fontSize: 16, marginTop: 12, color: theme.text }}>
                {item.exercise.prefix ?? ""}
                {item.exercise.name}
              </Text>
              {item.exercise.sets.map((set: Set, index: number) => (
                <Fragment key={`${index}-${set.id}`}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: set.isCompleted ? theme.tint : theme.text,
                    }}
                  >
                    {index + 1}. {set.reps} x {set.weight}
                  </Text>
                  {set.dropSets?.map((dropSet: DropSet, index: number) => (
                    <Text
                      key={`${index}-${dropSet.id}`}
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
    </View>
  );
}
